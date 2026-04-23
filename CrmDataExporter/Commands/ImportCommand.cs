

using CrmDataExporter.Core.Services;

namespace CrmDataExporter.Commands;

public static class ImportCommand
{
    public static async Task RunAsync(
        string version,
        string tableName,
        string outputDirectory,
        string connectionString)
    {
        Console.WriteLine($"Import en cours : {version} → {tableName}");

        var importer = new CrmImportService();
        var result = await importer.ImportAsync(outputDirectory, version, connectionString, tableName);

        Console.WriteLine($"Import terminé.");
        Console.WriteLine($"  Insérés    : {result.Inserted}");
        Console.WriteLine($"  Mis à jour : {result.Updated}");
        Console.WriteLine($"  Total      : {result.Total}");

        // Sauvegarder la date et le résultat de l'import
        string manifestPath = Path.Combine(outputDirectory, $"crm-import-manifest-{version}.json");
        string manifestContent = System.Text.Json.JsonSerializer.Serialize(result, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(manifestPath, manifestContent);
        
        Console.WriteLine($"  Date       : {result.ImportedAtUtc:O}");
        Console.WriteLine($"  Fichier    : {manifestPath}");
    }
}