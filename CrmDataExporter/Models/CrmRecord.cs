namespace CrmDataExporter.Models;

public class CrmRecord
{
    public required string Id { get; init; }
    public required string CustomerName { get; init; }
    public required string Email { get; init; }
    public DateTime LastUpdateUtc { get; init; }
}