namespace CrmDataExporter.Services;
using System.Security.Cryptography;
using System.Text.Json;
using CrmDataExporter.Models;

public sealed class CrmExportService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true
    };

    public async Task<ExportManifest> ExportRawAsync(
        IReadOnlyCollection<Dictionary<string, object?>> rows,
        string outputDirectory,
        string version,
        CancellationToken cancellationToken = default)
        => await ExportAsyncInternal(rows, rows.Count, outputDirectory, version, cancellationToken);

    private async Task<ExportManifest> ExportAsyncInternal(
        object payload,
        int recordCount,
        string outputDirectory,
        string version,
        CancellationToken cancellationToken)
    {
        Directory.CreateDirectory(outputDirectory);

        string dataFileName = $"crm-data-{version}.json";
        string dataFilePath = Path.Combine(outputDirectory, dataFileName);
        string manifestPath = Path.Combine(outputDirectory, $"crm-data-{version}.manifest.json");

        await using (FileStream stream = File.Create(dataFilePath))
        {
            await JsonSerializer.SerializeAsync(stream, payload, JsonOptions, cancellationToken);
        }

        string checksum = await ComputeSha256Async(dataFilePath, cancellationToken);

        var manifest = new ExportManifest
        {
            Version = version,
            CreatedAtUtc = DateTime.UtcNow,
            DataFile = dataFileName,
            ChecksumSha256 = checksum,
            RecordCount = recordCount
        };

        string manifestJson = JsonSerializer.Serialize(manifest, JsonOptions);
        await File.WriteAllTextAsync(manifestPath, manifestJson, cancellationToken);

        return manifest;
    }

    private static async Task<string> ComputeSha256Async(string filePath, CancellationToken cancellationToken)
    {
        await using FileStream stream = File.OpenRead(filePath);
        byte[] hash = await SHA256.HashDataAsync(stream, cancellationToken);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}


