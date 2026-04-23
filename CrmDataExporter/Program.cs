using CrmDataExporter.Commands;

string outputDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "exports");
string? connectionString = Environment.GetEnvironmentVariable("CRM_EXPORT_CONNECTION_STRING");

if (string.IsNullOrWhiteSpace(connectionString))
{
    Console.Error.WriteLine("Variable manquante: CRM_EXPORT_CONNECTION_STRING");
    Console.Error.WriteLine(
        "setx CRM_EXPORT_CONNECTION_STRING \"Server=MONSERVEUR;Database=MaBase;Trusted_Connection=True;TrustServerCertificate=True;\"");
    return;
}

string command = args.Length > 0 ? args[0] : "import";
string version = args.Length > 1
    ? args[1]
    : command == "import"
        ? GetLatestVersion(outputDirectory)
        : GetNextVersion(outputDirectory);
string tableName = args.Length > 2 ? args[2] : "sysadm.scr0";


switch (command)
{
    case "export":
        await ExportCommand.RunAsync(version, tableName, outputDirectory, connectionString);
        break;

    case "import":
        await ImportCommand.RunAsync(version, tableName, outputDirectory, connectionString);
        break;

    default:
        Console.Error.WriteLine($"Commande inconnue : '{command}'. Utilisez 'export' ou 'import'.");
        break;
}

static string GetLatestVersion(string outputDirectory)
{
    if (!Directory.Exists(outputDirectory))
        throw new Exception("Dossier exports introuvable");

    var latest = GetLatestVersionObject(outputDirectory);

    if (latest == null)
        throw new Exception("Aucun fichier d'export trouvé");

    return $"v{latest.Major}.{latest.Minor}.{latest.Build}";
}

static string GetNextVersion(string outputDirectory)
{
    if (!Directory.Exists(outputDirectory))
        return "v1.0.0";

    var latest = GetLatestVersionObject(outputDirectory);

    if (latest == null)
        return "v1.0.0";

    return $"v{latest.Major}.{latest.Minor}.{latest.Build + 1}";
}

static Version? GetLatestVersionObject(string outputDirectory)
{
    return Directory.GetFiles(outputDirectory, "crm-data-v*.json")
        .Select(Path.GetFileNameWithoutExtension)
        .Select(name => name?.Replace("crm-data-v", ""))
        .Select(v => Version.TryParse(v, out var parsed) ? parsed : null)
        .Where(v => v != null)
        .Select(v => v!)
        .OrderByDescending(v => v)
        .FirstOrDefault();
}