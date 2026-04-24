using CrmDataExporter.Core.Models;
using CrmDataExporter.Core.Services;
using System.Text.Json;

namespace CrmDataExporter.Commands;

public static class ExportCommand
{
    /// <summary>
    /// lancer l’export des données CRM
    /// </summary>
    public static async Task RunAsync(string tableName, string outputDirectory, string connectionString)
    {
        // Affiche le début de l'export
        Console.WriteLine($"Export en cours : {tableName}");

        // Récupère la date du dernier import (si existe)
        DateTime? lastImportDate = GetLastImportDate(outputDirectory);

        // Si un import précédent existe ou non
        Console.WriteLine(lastImportDate.HasValue
            ? $"Récupération des modifications depuis le dernier import ({lastImportDate:O})"
            : $"Aucun import précédent trouvé, récupération de tous les enregistrements");

        // Sécurise le nom de la table
        string safeTable = SqlHelper.BuildSafeSqlTableName(tableName);

        // Charge depuis la base filtrées par date si nécessaire
        List<CrmRecord> records = await SqlHelper.LoadRowsAsync(connectionString, safeTable, lastImportDate);

        // Initialise le service d'export
        var exporter = new CrmExportService();

        // Exporte les données et génère un manifest (fichier de métadonnées)
        var manifest = await exporter.ExportAsync(records, outputDirectory);

        // Si aucun changement: pas d’export
        if (manifest == null)
        {
            Console.WriteLine("Aucune modification trouvée. Export ignoré, aucun dossier créé.");
            return;
        }

        // Affichage des infos après export
        Console.WriteLine($"Export terminé.");
        Console.WriteLine($"  Data       : {manifest.DataFile}");
        Console.WriteLine($"  Nb records : {manifest.RecordCount}");
    }

    /// <summary>
    /// Cherche la date du dernier import à partir des fichiers manifest
    /// </summary>
    private static DateTime? GetLastImportDate(string outputDirectory)
    {
        // Aucun import si le dossier n'existe pas 
        if (!Directory.Exists(outputDirectory)) return null;

        string manifestPath = Path.Combine(outputDirectory, "crm-import-manifest.json");
        if (!File.Exists(manifestPath)) return null;

        try
        {
            string json = File.ReadAllText(manifestPath);
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("ImportedAtUtc", out var prop) && prop.TryGetDateTime(out var date))
            {
                return date;
            }
        }
        catch
        {
            // Ignore les erreurs
        }
        return null;
    }
}
