using CrmDataExporter.Core.Services;

namespace CrmDataExporter.Commands;

public static class ImportCommand
{
    /// <summary>
    /// lancer l'import des données vers la base
    /// </summary>
    public static async Task RunAsync(
        string tableName,
        string outputDirectory,
        string connectionString)
    {
        // Affiche le début de l'import
        Console.WriteLine($"Import en cours : → {tableName}");

        // Date du dernier import (pour n'appliquer que les .js modifiés depuis)
        DateTime? lastImportDate = ImportHistory.GetLastImportDateUtc(outputDirectory);

        // Sécurise le nom de la table (même logique que l'export)
        string safeTable = SqlHelper.BuildSafeSqlTableName(tableName);

        // Initialise le service d'import
        var importer = new CrmImportService();

        // Lance l'import des données depuis les fichiers exportés vers la base de données
        var result = await importer.ImportAsync(outputDirectory, connectionString, safeTable, lastImportDate);

        // Affiche les résultats de l'import
        Console.WriteLine($"Import terminé.");
        Console.WriteLine($"  Insérés    : {result.Inserted}");   // nb de nouveaux enregistrements
        Console.WriteLine($"  Mis à jour : {result.Updated}");   // nb d'enregistrements modifiés
        Console.WriteLine($"  Total      : {result.Total}");     // total traité

        //le chemin du fichier manifest (historique des imports)
        string manifestPath = Path.Combine(outputDirectory, "crm-import-manifest.json");

        // Convertit l'objet result en JSON lisible (indenté)
        string manifestContent = System.Text.Json.JsonSerializer.Serialize(
            result,
            new System.Text.Json.JsonSerializerOptions { WriteIndented = true });

        // Écrit le fichier JSON sur le disque
        await File.WriteAllTextAsync(manifestPath, manifestContent);
        
        // Affiche la date d'import
        Console.WriteLine($"  Date       : {result.ImportedAtUtc:O}");

        // Affiche le chemin du fichier généré
        Console.WriteLine($"  Fichier    : {manifestPath}");
    }

}
