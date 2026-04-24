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
string tableName = args.Length > 1 ? args[1] : "sysadm.scr0";


switch (command)
{
    case "export":
        await ExportCommand.RunAsync(tableName, outputDirectory, connectionString);
        break;

    case "import":
        await ImportCommand.RunAsync(tableName, outputDirectory, connectionString);
        break;

    default:
        Console.Error.WriteLine($"Commande inconnue : '{command}'. Utilisez 'export' ou 'import'.");
        break;
}