using System.Text.Json;
using CrmDataExporter.Core.Models;
using CrmDataExporter.Models;
using Microsoft.Data.SqlClient;

namespace CrmDataExporter.Core.Services;

/// <summary>
/// Service responsable de l'import des enregistrements CRM depuis le système de fichiers exporter vers la BD.
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
    /// <param name="version">Version à importer (ex: v1.0.2).</param>
    /// <param name="connectionString">Chaîne de connexion SQL Server.</param>
    /// <param name="safeTableName">Nom de table sécurisé (ex: [sysadm].[scr0]).</param>
    /// <returns>Résultat de l'import : nombre d'insertions, mises à jour et total.</returns>
    public async Task<ImportResult> ImportAsync(
        string exportsDirectory,
        string version,
        string connectionString,
        string safeTableName)
    {
        // 1. Lire le fichier JSON 
        string jsonPath = Path.Combine(exportsDirectory, $"crm-data-{version}.json");
        if (!File.Exists(jsonPath))
            throw new FileNotFoundException($"Fichier introuvable : {jsonPath}");

        string jsonContent = await File.ReadAllTextAsync(jsonPath);
        List<CrmRecord> records = DeserializeRecords(jsonContent);

        // ── 2. Réintégrer function_text depuis les fichiers .js 
        // Le JSON global ne contient pas function_text (exclu à l'export pour alléger).
        // On le relit depuis le dossier .functions et on le réinjecte dans chaque record.
        string functionsDir = Path.Combine(exportsDirectory, $"crm-data-{version}.functions");
        records = await MergeFunctionTextsAsync(records, functionsDir);

        // ── 3. Appliquer en base avec transaction
        int inserted = 0;
        int updated  = 0;

        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync();

        // Démarre une transaction pour garantir l'atomicité :
        // soit tous les enregistrements sont appliqués, soit aucun (en cas d'erreur)
        await using var transaction = connection.BeginTransaction();

        try
        {
            foreach (CrmRecord record in records)
            {
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

                await UpdateRecordAsync(
                    connection,
                    transaction,
                    safeTableName,
                    newDmod,
                    record);

                updated++;

                Console.WriteLine($"[UPDATE] ✓ Modifié : {record.FunctionName ?? "-"} | dmod={newDmod:yyyy-MM-dd HH:mm:ss}");
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
            Version  = version,
            Inserted = inserted,
            Updated  = updated,
            Total    = inserted + updated
        };
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

    /// <summary>
    /// Relit les fichiers .js du dossier .functions et réinjecte leur contenu
    /// dans la propriété FunctionText de chaque CrmRecord correspondant.
    /// Si le dossier n'existe pas, retourne les records inchangés.
    /// </summary>
    private static async Task<List<CrmRecord>> MergeFunctionTextsAsync(
        List<CrmRecord> records,
        string functionsDir)
    {
        if (!Directory.Exists(functionsDir))
        {
            Console.WriteLine($"  [WARN] Dossier de fonctions introuvable : {functionsDir}");
            return records;
        }

        var functionTexts = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (string jsFile in Directory.GetFiles(functionsDir, "*.js"))
        {
            string funcName = Path.GetFileNameWithoutExtension(jsFile);
            functionTexts[funcName] = await File.ReadAllTextAsync(jsFile);
        }

        return records.Select(r =>
        {
            if (r.FunctionName != null && functionTexts.TryGetValue(r.FunctionName, out string? text))
            {
                return r with { FunctionText = text };
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
        cmd.Parameters.AddWithValue("@nrid",                   r.Nrid);
        cmd.Parameters.AddWithValue("@rid",                    (object?)r.Rid                   ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@dmod",                   (object?)r.Dmod                  ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@rmod",                   (object?)r.Rmod                  ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@function_name",          (object?)r.FunctionName          ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@function_text",          (object?)r.FunctionText          ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@title",                  (object?)r.Title                 ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@description",            (object?)r.Description           ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@shortcut_description",   (object?)r.ShortcutDescription   ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@returndesc",             (object?)r.ReturnDesc            ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@template",               (object?)r.Template              ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@type",                   (object?)r.Type                  ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@browsers_compatibility", (object?)r.BrowsersCompatibility ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@lang_id",                (object?)r.LangId                ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@tier_id",                (object?)r.TierId                ?? DBNull.Value);
        cmd.Parameters.AddWithValue("@img",                    (object?)r.Img                   ?? DBNull.Value);
    }
}