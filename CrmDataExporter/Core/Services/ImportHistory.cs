using System.Text.Json;

namespace CrmDataExporter.Core.Services;

public static class ImportHistory
{
    public static DateTime? GetLastImportDateUtc(string exportsDirectory)
    {
        if (!Directory.Exists(exportsDirectory)) return null;

        string manifestPath = Path.Combine(exportsDirectory, "crm-import-manifest.json");
        if (!File.Exists(manifestPath)) return null;

        try
        {
            string json = File.ReadAllText(manifestPath);
            using var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("ImportedAtUtc", out var prop) && prop.TryGetDateTime(out var date))
                return date;
        }
        catch
        {
            // ignore
        }

        return null;
    }
}
