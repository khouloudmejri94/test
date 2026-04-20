using System.Text.RegularExpressions;
using CrmDataExporter.Services;
using Microsoft.Data.SqlClient;

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
    Console.Error.WriteLine("setx CRM_EXPORT_CONNECTION_STRING \"Server=srvcrmv9dev;Database=SANDBOX; TrustServerCertificate=True;\"");
    return;
}

string safeTableName = BuildSafeSqlTableName(tableName);
List<Dictionary<string, object?>> rows = await LoadRowsAsync(connectionString, safeTableName);

var exporter = new CrmExportService();
var manifest = await exporter.ExportRawAsync(rows, outputDirectory, version);

Console.WriteLine("Export termine avec succes.");
Console.WriteLine($"Version      : {manifest.Version}");
Console.WriteLine($"Table        : {tableName}");
Console.WriteLine($"Fichier data : {manifest.DataFile}");
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
