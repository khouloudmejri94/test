namespace CrmDataExporter.Core.Models;


    public sealed class ExportManifest
    {
        public DateTime CreatedAtUtc { get; init; }
        public required string DataFile { get; init; }
        public required string ChecksumSha256 { get; init; }
        public int RecordCount { get; init; }
    }

