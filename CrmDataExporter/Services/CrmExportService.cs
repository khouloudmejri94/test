using System.Text.Json;
using CrmDataExporter.Models;

namespace CrmDataExporter.Services;

/// <summary>
/// Service responsable de l'export des enregistrements CRM vers des fichiers js.
/// Produit deux artefacts : un fichier JSON global et un dossier de fichiers JS séparés.
/// </summary>
public sealed class CrmExportService
{
    /// <summary>
    /// Exporte la liste des enregistrements CRM en deux formats :
    /// 1. Un fichier JSON sans les function_text (données légères)
    /// 2. Un dossier chaque function dans un fichier .js par enregistrement
    /// Retourne un manifest contenant les métadonnées de l'export.
    /// </summary>
    /// <param name="records">Liste des enregistrements lus depuis la BD.</param>
    /// <param name="outputDirectory">Dossier de destination des fichiers exportés.</param>
    /// <param name="version">Version de l'export (ex: v1.0.2).</param>
    /// <returns>Manifest contenant version, checksum, chemin et nombre d'enregistrements.</returns>
    public async Task<ExportManifest> ExportAsync(
        List<CrmRecord> records,
        string outputDirectory,
        string version)
    {
        // Crée le dossier de sortie s'il n'existe pas encore
        Directory.CreateDirectory(outputDirectory);

        // ── 1. Export JSON 
        // Exclut function_text du JSON global pour alléger le fichier.
        // Les textes des fonctions sont exportés séparément dans le dossier (.functions).
        var sanitized = records.Select(r => new
        {
            r.Nrid, r.Rid, r.Dmod, r.Rmod,
            r.FunctionName, r.Title, r.Description,
            r.ShortcutDescription, r.ReturnDesc,
            r.Template, r.Type, r.BrowsersCompatibility,
            r.LangId, r.TierId
        }).ToList();

        string jsonPath = Path.Combine(outputDirectory, $"crm-data-{version}.json");

        // Sérialise avec indentation pour lisibilité humaine
        string jsonContent = JsonSerializer.Serialize(sanitized, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(jsonPath, jsonContent);

        // ── 2. Export (fichiers .js) séparés
        // Crée un dossier crm-data-{version}.functions
        // Chaque enregistrement ayant un function_text devient un fichier .js individuel
        string functionsDir = Path.Combine(outputDirectory, $"crm-data-{version}.functions");
        Directory.CreateDirectory(functionsDir);

        foreach (CrmRecord record in records.Where(r => !string.IsNullOrWhiteSpace(r.FunctionText)))
        {
            // Nom du fichier basé sur function_name, nettoyé des caractères invalides
            string fileName = $"{SanitizeFileName(record.FunctionName)}.js";
            await File.WriteAllTextAsync(Path.Combine(functionsDir, fileName), record.FunctionText!);
        }

        // ── 3. Calcul du checksum SHA-256
        // Le checksum est calculé sur le contenu JSON pour détecter toute altération
        string checksum = Convert.ToHexString(
            System.Security.Cryptography.SHA256.HashData(
                System.Text.Encoding.UTF8.GetBytes(jsonContent)));
        string manifestPath = Path.Combine(outputDirectory, $"crm-data-manifest-{version}.json");

        string manifestContent = JsonSerializer.Serialize(
            new ExportManifest
            {
                Version = version,
                CreatedAtUtc = DateTime.UtcNow,
                DataFile = jsonPath,
                ChecksumSha256 = checksum,
                RecordCount = records.Count
            },
            new JsonSerializerOptions { WriteIndented = true });

        await File.WriteAllTextAsync(manifestPath, manifestContent);
        // ── 4. Retourne le manifest de l'export 
        return new ExportManifest
        {
            Version = version,
            CreatedAtUtc = DateTime.UtcNow,
            DataFile = jsonPath,
            ChecksumSha256 = checksum,
            RecordCount = records.Count
        };
    }

    /// <summary>
    /// Nettoie un nom de fonction pour l'utiliser comme nom de fichier.
    /// Remplace les caractères invalides par '_' et supprime les tirets/underscores en début et fin.
    /// </summary>
    /// <param name="value">Nom brut de la fonction (ex: "AfterLoad_FP_1000003").</param>
    /// <returns>Nom de fichier sécurisé (ex: "AfterLoad_FP_1000003") ou "function-unknown" si vide.</returns>
    private static string SanitizeFileName(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return "function-unknown";

        var invalid = Path.GetInvalidFileNameChars();

        // Remplace chaque caractère invalide par '_'
        return new string(value.Select(c => invalid.Contains(c) ? '_' : c).ToArray())
            .Trim('-', '_');
    }
}