namespace CrmDataExporter.Core.Models;


    public sealed class ExportManifest
    {
        public string? FunctionsDirectory { get; set; }
        public DateTime CreatedAtUtc { get; init; }
        public required string DataFile { get; init; }
        public int RecordCount { get; init; }
    }

