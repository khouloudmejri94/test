namespace CrmDataExporter.Models;

public sealed record ImportResult
{
    public int Inserted { get; init; }
    public int Updated { get; init; }
    public int Total { get; init; }
    public DateTime ImportedAtUtc { get; init; } = DateTime.UtcNow;
}