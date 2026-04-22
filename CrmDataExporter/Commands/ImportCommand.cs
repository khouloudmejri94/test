using CrmDataExporter.Core.Services;
using CrmDataExporter.Services;

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
    }
}