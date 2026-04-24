using System.Text.Json;
using CrmDataExporter.Core.Models;
using CrmDataExporter.Models;
using Microsoft.Data.SqlClient;

namespace CrmDataExporter.Core.Services;

/// <summary>
/// Service permet d'import des enregistrements CRM depuis le système de fichiers exporter vers la BD.
/// Lit le (fichier JSON) + (les fichiers .js), puis applique les changements en base via une transaction.
/// </summary>
public sealed class CrmImportService
{
    /// <summary>
    /// Importe une version exportée dans la table cible.
    /// Pour chaque enregistrement : INSERT si inexistant, UPDATE si déjà présent (upsert).
    /// Toutes les opérations sont encapsulées dans une transaction — rollback automatique en cas d'erreur.
    /// </summary>
    /// <param name="exportsDirectory">Dossier contenant les fichiers exportés.</param>
    /// <param name="connectionString">Chaîne de connexion SQL Server.</param>
    /// <param name="safeTableName">Nom de table sécurisé (ex: [sysadm].[scr0]).</param>
    /// <returns>Résultat de l'import : nombre d'insertions, mises à jour et total.</returns>
    public async Task<ImportResult> ImportAsync(
        string exportsDirectory,
        string connectionString,
        string safeTableName)
    {
        // Résoudre les chemins d'export (via manifest si disponible)
        var (dataFilePath, functionsDir) = await ResolveExportPathsAsync(exportsDirectory);

        // Charger le JSON si présent (peut être filtré via last-import-date)
        List<CrmRecord> records = [];
        if (File.Exists(dataFilePath))
        {
            string jsonContent = await File.ReadAllTextAsync(dataFilePath);
            records = DeserializeRecords(jsonContent);
        }

        // Charger les fichiers .js et réinjecter les function_text sur les records du JSON.
        var functionTexts = await LoadFunctionTextsAsync(functionsDir);
        records = MergeFunctionTexts(records, functionTexts);

        // Appliquer en base avec transaction
        int inserted = 0;
        int updated = 0;

        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync();

        // Démarre une transaction pour garantir l'atomicité :
        // soit tous les enregistrements sont appliqués, soit aucun (en cas d'erreur)
        await using var transaction = connection.BeginTransaction();

        try
        {
            // Import des records provenant du JSON (upsert par nrid).
            foreach (CrmRecord record in records)
            {
                if (string.IsNullOrWhiteSpace(record.Nrid))
                    throw new InvalidDataException("Un record importé ne contient pas de 'Nrid' (champ requis).");

                bool exists = await RecordExistsAsync(connection, transaction, safeTableName, record.Nrid);

                if (!exists)
                {
                    await InsertRecordAsync(connection, transaction, safeTableName, record);
                    inserted++;
                    Console.WriteLine($"[INSERT] + Ajouté : {record.FunctionName ?? "-"}");
                    continue;
                }

                string? currentFunctionText = await GetFunctionTextAsync(
                    connection, transaction, safeTableName, record.Nrid);

                bool functionTextChanged = !string.Equals(
                    currentFunctionText?.Trim(),
                    record.FunctionText?.Trim(),
                    StringComparison.Ordinal);

                if (!functionTextChanged)
                    continue;

                DateTime newDmod = DateTime.UtcNow;

                // Quand on importe un record "complet" depuis le JSON, on applique toutes les colonnes.
                // Cela évite des incohérences entre le fichier exporté et la base.
                await UpdateRecordAsync(connection, transaction, safeTableName, newDmod, record);

                updated++;

                Console.WriteLine(
                    $"[UPDATE] ✓ Modifié : {record.FunctionName ?? "-"} | dmod={newDmod:yyyy-MM-dd HH:mm:ss}");
            }

            // Import "functions-only": pour les .js qui ne sont pas présents dans le JSON
             // On met à jour uniquement function_text + dmod en recherchant la ligne via function_name.
            var knownFunctionNames = new HashSet<string>(
                records.Select(r => r.FunctionName).Where(n => !string.IsNullOrWhiteSpace(n))!,
                StringComparer.OrdinalIgnoreCase);

            foreach (var (functionName, newText) in functionTexts)
            {
                if (knownFunctionNames.Contains(functionName))
                    continue;

                var row = await GetRowByFunctionNameAsync(connection, transaction, safeTableName, functionName);
                if (row == null)
                {
                    Console.WriteLine(
                        $"[WARN] Aucune ligne trouvée pour function_name='{functionName}' (script ignoré).");
                    continue;
                }

                bool changed = !string.Equals(
                    row.Value.CurrentFunctionText?.Trim(),
                    newText?.Trim(),
                    StringComparison.Ordinal);

                if (!changed)
                    continue;

                DateTime newDmod = DateTime.UtcNow;
                await UpdateFunctionTextOnlyAsync(connection, transaction, safeTableName, row.Value.Nrid, newDmod,
                    newText);
                updated++;
                Console.WriteLine(
                    $"[UPDATE] ✓ Modifié (functions-only) : {functionName} | dmod={newDmod:yyyy-MM-dd HH:mm:ss}");
            }

            // Valide toutes les opérations si aucune erreur
            await transaction.CommitAsync();
            Console.WriteLine("Transaction validée (COMMIT).");
        }
        catch (Exception ex)
        {
            // Annule toutes les opérations en cas d'erreur pour préserver l'intégrité de la BD
            await transaction.RollbackAsync();
            Console.Error.WriteLine($"  Erreur — Transaction annulée (ROLLBACK) : {ex.Message}");
            throw;
        }

        return new ImportResult
        {
            Inserted = inserted,
            Updated = updated,
            Total = inserted + updated
        };
    }

    private static async Task<(string dataFilePath, string functionsDir)> ResolveExportPathsAsync(
        string exportsDirectory)
    {
        string defaultData = Path.Combine(exportsDirectory, "crm-data.json");
        string defaultFunctions = Path.Combine(exportsDirectory, "crm-data.functions");

        string manifestPath = Path.Combine(exportsDirectory, "crm-data-manifest.json");
        if (!File.Exists(manifestPath))
            return (defaultData, defaultFunctions);

        try
        {
            string json = await File.ReadAllTextAsync(manifestPath);
            using var doc = JsonDocument.Parse(json);
            string? dataFile = doc.RootElement.TryGetProperty("DataFile", out var df) ? df.GetString() : null;
            string? functionsDirectory =
                doc.RootElement.TryGetProperty("FunctionsDirectory", out var fd) ? fd.GetString() : null;

            return (
                string.IsNullOrWhiteSpace(dataFile) ? defaultData : dataFile,
                string.IsNullOrWhiteSpace(functionsDirectory) ? defaultFunctions : functionsDirectory
            );
        }
        catch
        {
            return (defaultData, defaultFunctions);
        }
    }

    /// <summary>
    /// Récupère le contenu du champ function_text depuis la base de données
    /// pour un enregistrement identifié par son nrid.
    /// </summary>
    /// <param name="connection">Connexion SQL Server déjà ouverte.</param>
    /// <param name="transaction">Transaction en cours pour garantir la cohérence des données.</param>
    /// <param name="tableName">Nom de la table cible (ex: [sysadm].[scr0]).</param>
    /// <param name="nrid">Identifiant unique de l’enregistrement.</param>
    /// <returns>
    /// Le contenu de function_text si présent en base,
    /// sinon null si la valeur est NULL ou inexistante.
    /// </returns> 
    private static async Task<string?> GetFunctionTextAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string nrid)
    {
        string sql = $"SELECT function_text FROM {tableName} WHERE nrid = @nrid";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        cmd.Parameters.AddWithValue("@nrid", nrid);

        var result = await cmd.ExecuteScalarAsync();

        if (result == null || result == DBNull.Value)
            return null;

        return result.ToString();
    }

    /// <summary>
    /// Désérialise le contenu JSON en liste de CrmRecord.
    /// La désérialisation est insensible à la casse des noms de propriétés.
    /// </summary>
    private static List<CrmRecord> DeserializeRecords(string jsonContent)
    {
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        return JsonSerializer.Deserialize<List<CrmRecord>>(jsonContent, options)
               ?? throw new InvalidDataException("JSON invalide ou vide.");
    }

    private static async Task<Dictionary<string, string?>> LoadFunctionTextsAsync(string functionsDir)
    {
        var functionTexts = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);

        if (!Directory.Exists(functionsDir))
        {
            Console.WriteLine($" Dossier de fonctions introuvable : {functionsDir}");
            return functionTexts;
        }

        foreach (string jsFile in Directory.GetFiles(functionsDir, "*.js"))
        {
            string funcName = Path.GetFileNameWithoutExtension(jsFile);
            functionTexts[funcName] = await File.ReadAllTextAsync(jsFile);
        }

        return functionTexts;
    }

    private static List<CrmRecord> MergeFunctionTexts(List<CrmRecord> records,
        Dictionary<string, string?> functionTexts)
    {
        if (records.Count == 0 || functionTexts.Count == 0)
            return records;

        return records.Select(r =>
        {
            if (!string.IsNullOrWhiteSpace(r.FunctionName) && functionTexts.TryGetValue(r.FunctionName, out var text))
                return r with { FunctionText = text };

            return r;
        }).ToList();
    }

    /// <summary>
    /// Vérifie si un enregistrement existe déjà en base en recherchant par nrid.
    /// </summary>
    private static async Task<bool> RecordExistsAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string nrid)
    {
        string sql = $"SELECT COUNT(1) FROM {tableName} WHERE nrid = @nrid";
        await using var cmd = new SqlCommand(sql, connection, transaction);
        cmd.Parameters.AddWithValue("@nrid", nrid);
        int count = (int)(await cmd.ExecuteScalarAsync() ?? 0);
        return count > 0;
    }

    private readonly record struct FunctionRow(string Nrid, string? CurrentFunctionText);

    private static async Task<FunctionRow?> GetRowByFunctionNameAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string functionName)
    {
        string sql = $"SELECT TOP 1 nrid, function_text FROM {tableName} WHERE function_name = @function_name";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        cmd.Parameters.AddWithValue("@function_name", functionName);

        await using var reader = await cmd.ExecuteReaderAsync();
        if (!await reader.ReadAsync())
            return null;

        string nrid = Convert.ToString(reader.GetValue(reader.GetOrdinal("nrid"))) ?? string.Empty;
        string? functionText = reader.IsDBNull(reader.GetOrdinal("function_text"))
            ? null
            : reader.GetValue(reader.GetOrdinal("function_text")).ToString();

        if (string.IsNullOrWhiteSpace(nrid))
            return null;

        return new FunctionRow(nrid, functionText);
    }

    private static async Task UpdateFunctionTextOnlyAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string nrid,
        DateTime dmod,
        string? functionText)
    {
        string sql = $@"
UPDATE {tableName}
SET function_text = @function_text,
    dmod          = @dmod
WHERE nrid = @nrid";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        cmd.Parameters.AddWithValue("@nrid", nrid);
        cmd.Parameters.AddWithValue("@dmod", dmod);
        cmd.Parameters.AddWithValue("@function_text", (object?)functionText ?? DBNull.Value);
        await cmd.ExecuteNonQueryAsync();
    }

    /// <summary>
    /// Insère un nouvel enregistrement dans la table cible.
    /// Toutes les colonnes sont insérées, les valeurs nulles sont remplacées par DBNull.
    /// </summary>
    private static async Task InsertRecordAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        CrmRecord r)
    {
        string sql = $@"
            INSERT INTO {tableName} (
                nrid, rid, dmod, rmod,
                function_name, function_text, title, description,
                shortcut_description, returndesc, template, type,
                browsers_compatibility, lang_id, tier_id, img
            ) VALUES (
                @nrid, @rid, @dmod, @rmod,
                @function_name, @function_text, @title, @description,
                @shortcut_description, @returndesc, @template, @type,
                @browsers_compatibility, @lang_id, @tier_id, @img
            )";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        AddParameters(cmd, r);
        await cmd.ExecuteNonQueryAsync();
    }

    /// <summary>
    /// Met à jour un enregistrement existant identifié par son nrid.
    /// Toutes les colonnes sauf nrid sont mises à jour.
    /// </summary>
    private static async Task UpdateRecordAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        DateTime dmod,
        CrmRecord r)
    {
        string sql = $@"
    UPDATE {tableName} SET
        rid                    = @rid,
        dmod                   = @dmod,
        rmod                   = @rmod,
        function_name          = @function_name,
        function_text          = @function_text,
        title                  = @title,
        description            = @description,
        shortcut_description   = @shortcut_description,
        returndesc             = @returndesc,
        template               = @template,
        type                   = @type,
        browsers_compatibility = @browsers_compatibility,
        lang_id                = @lang_id,
        tier_id                = @tier_id,
        img                    = @img
    WHERE nrid = @nrid";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        AddParameters(cmd, r);
        cmd.Parameters["@dmod"].Value = dmod;

        await cmd.ExecuteNonQueryAsync();
    }

    /// <summary>
    /// Ajoute tous les paramètres SQL à la commande.
    /// Partagé entre INSERT et UPDATE pour éviter la duplication.
    /// Les propriétés nulles sont converties en DBNull.Value pour SQL Server.
    /// </summary>
    private static void AddParameters(SqlCommand cmd, CrmRecord r)
    {
        cmd.Parameters.AddWithValue("@nrid", r.Nrid);
        cmd.Parameters.AddWithValue("@rid", (object?)r.Rid ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@dmod", (object?)r.Dmod ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@rmod", (object?)r.Rmod ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@function_name", (object?)r.FunctionName ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@function_text", (object?)r.FunctionText ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@title", (object?)r.Title ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@description", (object?)r.Description ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@shortcut_description", (object?)r.ShortcutDescription ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@returndesc", (object?)r.ReturnDesc ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@template", (object?)r.Template ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@type", (object?)r.Type ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@browsers_compatibility", (object?)r.BrowsersCompatibility ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@lang_id", (object?)r.LangId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@tier_id", (object?)r.TierId ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@img", (object?)r.Img ?? DBNull.Value);
    }
}