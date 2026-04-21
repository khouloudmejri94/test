using System.Text.RegularExpressions;
using Microsoft.Data.SqlClient;
using CrmDataExporter.Services;

string version = args.Length > 0
    ? args[0]
    : $"v{DateTime.UtcNow:yyyy.MM.dd.HHmmss}";

string tableName = args.Length > 1
    ? args[1]
    : "crs0";

string outputDirectory = Path.Combine(AppContext.BaseDirectory, "exports");
string? connectionString = Environment.GetEnvironmentVariable("CRM_EXPORT_CONNECTION_STRING");

if (string.IsNullOrWhiteSpace(connectionString))
{
    Console.Error.WriteLine("Variable manquante: CRM_EXPORT_CONNECTION_STRING");
    Console.Error.WriteLine("Exemple:");
    Console.Error.WriteLine("setx CRM_EXPORT_CONNECTION_STRING \"Server=MONSERVEUR;Database=MaBase;Trusted_Connection=True;TrustServerCertificate=True;\"");
    return;
}

string safeTableName = BuildSafeSqlTableName(tableName);
List<Dictionary<string, object?>> rows = await LoadRowsAsync(connectionString, safeTableName);
List<Dictionary<string, object?>> sanitizedRows = SanitizeRowsForGlobalExport(rows);

var exporter = new CrmExportService();
var manifest = await exporter.ExportRawAsync(sanitizedRows, outputDirectory, version);
string functionsDirectoryPath = await ExportFunctionsSeparateFilesAsync(rows, outputDirectory, version);

Console.WriteLine("Export termine avec succes.");
Console.WriteLine($"Version      : {manifest.Version}");
Console.WriteLine($"Table        : {tableName}");
Console.WriteLine($"Fichier data : {manifest.DataFile}");
Console.WriteLine($"Dossier fonctions separees : {functionsDirectoryPath}");
Console.WriteLine($"Checksum     : {manifest.ChecksumSha256}");
Console.WriteLine($"Nb enregistrements : {manifest.RecordCount}");
Console.WriteLine($"Dossier sortie: {outputDirectory}");

static async Task<List<Dictionary<string, object?>>> LoadRowsAsync(string connectionString, string safeTableName)
{
    var rows = new List<Dictionary<string, object?>>();
    string sql = $"SELECT * FROM {safeTableName}";

    await using var connection = new SqlConnection(connectionString);
    await connection.OpenAsync();

    await using var command = new SqlCommand(sql, connection)
    {
        CommandTimeout = 120
    };

    await using SqlDataReader reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        var row = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
        for (int i = 0; i < reader.FieldCount; i++)
        {
            object? value = reader.IsDBNull(i) ? null : reader.GetValue(i);
            row[reader.GetName(i)] = value;
        }
        rows.Add(row);
    }

    return rows;
}

static async Task<string> ExportFunctionsSeparateFilesAsync(
    IReadOnlyCollection<Dictionary<string, object?>> rows,
    string outputDirectory,
    string version)
{
    string directoryPath = Path.Combine(outputDirectory, $"crm-data-{version}.functions");
    Directory.CreateDirectory(directoryPath);
    int fallbackIndex = 1;

    foreach (Dictionary<string, object?> row in rows)
    {
        string? functionName = GetStringValue(row, "function_name");
        string? functionText = GetStringValue(row, "function_text");

        if (string.IsNullOrWhiteSpace(functionText))
        {
            continue;
        }

        string fileName = BuildFunctionFileName(functionName, fallbackIndex);
        fallbackIndex++;

        string filePath = Path.Combine(directoryPath, fileName);
        string cleanedFunctionText = RemoveFunctionName(functionText);
        await File.WriteAllTextAsync(filePath, cleanedFunctionText);
    }

    return directoryPath;
}

static List<Dictionary<string, object?>> SanitizeRowsForGlobalExport(
    IReadOnlyCollection<Dictionary<string, object?>> rows)
{
    var sanitized = new List<Dictionary<string, object?>>(rows.Count);

    foreach (Dictionary<string, object?> row in rows)
    {
        var copy = new Dictionary<string, object?>(row, StringComparer.OrdinalIgnoreCase);
        copy.Remove("function_name");
        copy.Remove("function_text");
        sanitized.Add(copy);
    }

    return sanitized;
}

static string BuildFunctionFileName(string? functionName, int fallbackIndex)
{
    string safeName = SanitizeFileName(functionName);
    if (string.IsNullOrWhiteSpace(safeName))
    {
        safeName = $"function-{fallbackIndex:0000}";
    }

    return $"{safeName}.js";
}

static string SanitizeFileName(string? value)
{
    if (string.IsNullOrWhiteSpace(value))
    {
        return string.Empty;
    }

    char[] invalidChars = Path.GetInvalidFileNameChars();
    string sanitized = new(value.Select(ch => invalidChars.Contains(ch) ? '_' : ch).ToArray());
    sanitized = Regex.Replace(sanitized, "\\s+", "-");
    return sanitized.Trim('-', '_');
}

static string? GetStringValue(Dictionary<string, object?> row, string key)
{
    if (!row.TryGetValue(key, out object? value) || value is null || value is DBNull)
    {
        return null;
    }

    return Convert.ToString(value);
}

static string RemoveFunctionName(string functionText)
{
    return Regex.Replace(
        functionText,
        @"\bfunction\s+[A-Za-z_$][A-Za-z0-9_$]*\s*\(",
        "function(");
}

static string BuildSafeSqlTableName(string tableName)
{
    if (string.IsNullOrWhiteSpace(tableName))
    {
        throw new ArgumentException("Le nom de table est vide.");
    }

    string[] parts = tableName.Split('.', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    if (parts.Length is < 1 or > 2)
    {
        throw new ArgumentException("Format accepte: table ou schema.table");
    }

    var safeParts = new List<string>(parts.Length);
    foreach (string part in parts)
    {
        if (!Regex.IsMatch(part, "^[A-Za-z0-9_]+$"))
        {
            throw new ArgumentException($"Nom de table invalide: '{tableName}'");
        }
        safeParts.Add($"[{part}]");
    }

    return string.Join('.', safeParts);
}
