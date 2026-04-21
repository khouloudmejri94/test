namespace CrmDataExporter.Models;

public sealed class CrmRecord
{
    public long Nrid { get; init; }
    public long? Rid { get; init; }
    public DateTime? Dmod { get; init; }
    public long? Rmod { get; init; }

    public string? FunctionName { get; init; }
    public string? FunctionText { get; init; }
    public string? Title { get; init; }
    public string? Description { get; init; }
    public string? ShortcutDescription { get; init; }
    public string? ReturnDesc { get; init; }
    public string? Template { get; init; }
    public string? Type { get; init; }
    public string? BrowsersCompatibility { get; init; }

    public long? LangId { get; init; }
    public long? TierId { get; init; }
    public byte[]? Img { get; init; }
}