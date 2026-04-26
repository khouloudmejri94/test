using System.Text.Json;
using CrmDataExporter.Core.Models;
using CrmDataExporter.Models;
using Microsoft.Data.SqlClient;
using System.Data;

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
        string safeTableName,
        DateTime? sinceUtc = null)
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
        // Important: le JSON peut être partiel (ou filtré) — on supporte aussi l'import "JS only"
        // en mettant à jour la base via function_name quand le record n'est pas dans le JSON.
        var functionTexts = await LoadFunctionTextsAsync(functionsDir, sinceUtc);
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

            // Import "JS only": applique aussi les fichiers .js non présents dans le JSON.
            // Cela permet de modifier une fonction via Git (fichier .js) sans réexport complet.
            if (functionTexts.Count > 0)
            {
                var jsonFunctionNames = new HashSet<string>(
                    records
                        .Where(r => !string.IsNullOrWhiteSpace(r.FunctionName))
                        .Select(r => r.FunctionName!),
                    StringComparer.OrdinalIgnoreCase);

                foreach (var (functionName, jsText) in functionTexts)
                {
                    if (string.IsNullOrWhiteSpace(functionName))
                        continue;

                    // Déjà traité via JSON
                    if (jsonFunctionNames.Contains(functionName) ||
                        (!functionName.StartsWith("__", StringComparison.Ordinal) &&
                         jsonFunctionNames.Contains($"__{functionName}")))
                        continue;

                    // On ne peut pas importer une fonction vide
                    if (string.IsNullOrWhiteSpace(jsText))
                        continue;

                    DateTime newDmod = DateTime.UtcNow;
                    string targetFunctionName = functionName;
                    int affected = await UpdateFunctionTextByFunctionNameAsync(
                        connection, transaction, safeTableName, targetFunctionName, newDmod, jsText);

                    // Supporte le cas où le fichier est sans "__" mais la base utilise "__"
                    if (affected <= 0 && !targetFunctionName.StartsWith("__", StringComparison.Ordinal))
                    {
                        affected = await UpdateFunctionTextByFunctionNameAsync(
                            connection, transaction, safeTableName, $"__{targetFunctionName}", newDmod, jsText);
                        if (affected > 0)
                            targetFunctionName = $"__{targetFunctionName}";
                    }

                    if (affected <= 0)
                    {
                        // Pas de correspondance en base: on n'insère pas ici car les autres colonnes sont inconnues
                        Console.WriteLine($"[SKIP] ? Introuvable en base (function_name) : {targetFunctionName}");
                        continue;
                    }

                    // Vérification: on relit une ligne pour s'assurer que la valeur en base correspond
                    string? after = await GetFunctionTextByFunctionNameAsync(
                        connection, transaction, safeTableName, targetFunctionName);

                    bool verified = string.Equals(after?.Trim(), jsText.Trim(), StringComparison.Ordinal);
                    if (!verified)
                    {
                        Console.WriteLine($"[WARN] ! UPDATE fait mais valeur différente en base : {targetFunctionName} (affected={affected})");
                        continue;
                    }

                    updated += affected;
                    Console.WriteLine($"[UPDATE] ✓ Modifié (JS) : {targetFunctionName} | affected={affected} | dmod={newDmod:yyyy-MM-dd HH:mm:ss}");
                }
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

            string ResolvePath(string? value, string fallbackAbsolutePath)
            {
                if (string.IsNullOrWhiteSpace(value))
                    return fallbackAbsolutePath;

                // Supporte les manifests "portables" (chemins relatifs) et les anciens (absolus)
                return Path.IsPathRooted(value)
                    ? value
                    : Path.GetFullPath(Path.Combine(exportsDirectory, value));
            }

            return (
                ResolvePath(dataFile, defaultData),
                ResolvePath(functionsDirectory, defaultFunctions)
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

    private static async Task<string?> GetFunctionTextByFunctionNameAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string functionName)
    {
        string sql = $"SELECT TOP (1) function_text FROM {tableName} WHERE function_name = @function_name";
        await using var cmd = new SqlCommand(sql, connection, transaction);
        var p = cmd.Parameters.Add("@function_name", SqlDbType.NVarChar, 255);
        p.Value = functionName;

        var result = await cmd.ExecuteScalarAsync();
        if (result == null || result == DBNull.Value)
            return null;

        return result.ToString();
    }

    private static async Task<int> UpdateFunctionTextByFunctionNameAsync(
        SqlConnection connection,
        SqlTransaction transaction,
        string tableName,
        string functionName,
        DateTime dmod,
        string functionText)
    {
        string sql = $@"
    UPDATE {tableName} SET
        dmod          = @dmod,
        function_text = @function_text
    WHERE function_name = @function_name";

        await using var cmd = new SqlCommand(sql, connection, transaction);
        var pName = cmd.Parameters.Add("@function_name", SqlDbType.NVarChar, 255);
        pName.Value = functionName;

        var pDmod = cmd.Parameters.Add("@dmod", SqlDbType.DateTime2);
        pDmod.Value = dmod;

        // Important: éviter AddWithValue (mauvaise inférence de type/longueur)
        var pText = cmd.Parameters.Add("@function_text", SqlDbType.NText);
        pText.Value = functionText;

        return await cmd.ExecuteNonQueryAsync();
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

    private static async Task<Dictionary<string, string?>> LoadFunctionTextsAsync(
        string functionsDir,
        DateTime? sinceUtc)
    {
        var functionTexts = new Dictionary<string, string?>(StringComparer.OrdinalIgnoreCase);

        if (!Directory.Exists(functionsDir))
        {
            Console.WriteLine($" Dossier de fonctions introuvable : {functionsDir}");
            return functionTexts;
        }

        foreach (string jsFile in Directory.GetFiles(functionsDir, "*.js"))
        {
            if (sinceUtc.HasValue)
            {
                DateTime lastWriteUtc = File.GetLastWriteTimeUtc(jsFile);
                if (lastWriteUtc <= sinceUtc.Value)
                    continue;
            }

            string funcName = Path.GetFileNameWithoutExtension(jsFile);
            string content = await File.ReadAllTextAsync(jsFile);

            // Le CRM peut avoir des noms de fonctions avec préfixe "__" alors que le fichier est sans préfixe
            functionTexts[funcName] = content;
            if (!funcName.StartsWith("__", StringComparison.Ordinal) && !functionTexts.ContainsKey($"__{funcName}"))
                functionTexts[$"__{funcName}"] = content;
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
            if (!string.IsNullOrWhiteSpace(r.FunctionName))
            {
                // Match exact ou via variante "__"
                if (functionTexts.TryGetValue(r.FunctionName, out var text))
                    return r with { FunctionText = text };

                if (r.FunctionName.StartsWith("__", StringComparison.Ordinal) &&
                    functionTexts.TryGetValue(r.FunctionName.TrimStart('_'), out var noPrefix))
                    return r with { FunctionText = noPrefix };
            }

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