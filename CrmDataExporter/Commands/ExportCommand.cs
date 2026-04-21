using CrmDataExporter.Models;
using CrmDataExporter.Services;

namespace CrmDataExporter.Commands;

public static class ExportCommand
{
    public static async Task RunAsync(string version, string tableName, string outputDirectory, string connectionString)
    {
        Console.WriteLine($"Export en cours : {tableName} → {version}");

        string safeTable = SqlHelper.BuildSafeSqlTableName(tableName);
        List<CrmRecord> records = await SqlHelper.LoadRowsAsync(connectionString, safeTable);

        var exporter = new CrmExportService();
        var manifest = await exporter.ExportAsync(records, outputDirectory, version);

        Console.WriteLine($"Export terminé.");
        Console.WriteLine($"  Version    : {manifest.Version}");
        Console.WriteLine($"  Data       : {manifest.DataFile}");
        Console.WriteLine($"  Checksum   : {manifest.ChecksumSha256}");
        Console.WriteLine($"  Nb records : {manifest.RecordCount}");
    }
}