using Microsoft.Data.SqlClient;

namespace CrmDataExporter.Core.Models;

/// <summary>
/// Représente un enregistrement de la table scr0 du CRM.
/// Modélise fidèlement la structure de la BD : toutes les colonnes sont nullable
/// sauf Nrid qui est l'identifiant unique de chaque enregistrement.
/// Déclaré en "record" pour bénéficier de l'expression "with" (copie non-destructive)
/// utilisée dans CrmImportService pour réinjecter FunctionText sans modifier l'original.
/// Déclaré "sealed" pour interdire l'héritage.
/// Toutes les propriétés sont "init" : immuables après construction.
/// </summary>
public sealed record CrmRecord
{
    /// <summary>
    /// Identifiant unique de l'enregistrement .
    /// </summary>
    public string Nrid { get; init; } = string.Empty;

    /// <summary>
    /// Identifiant de révision.
    /// </summary>
    public string? Rid { get; init; }

    /// <summary>
    /// Date de dernière modification.
    /// </summary>
    public DateTime? Dmod { get; init; }

    /// <summary>
    /// Numéro de révision.
    /// </summary>
    public string? Rmod { get; init; }

    /// <summary>
    /// Identifiant de la langue associée.
    /// </summary>
    public string? LangId { get; init; }

    /// <summary>
    /// Identifiant du niveau (tier) associé.
    /// </summary>
    public string? TierId { get; init; }

    /// <summary>
    /// Nom de la fonction JavaScript (utilisé comme nom de fichier .js à l'export).
    /// </summary>
    public string? FunctionName { get; init; }

    /// <summary>
    /// Code du fonction JavaScript.
    /// Exclu du fichier JSON global à l'export — stocké séparément dans le dossier .functions.
    /// Réinjecté lors de l'import via MergeFunctionTextsAsync.
    /// </summary>
    public string? FunctionText { get; init; }

    /// <summary>
    /// Titre de l'enregistrement.
    /// </summary>
    public string? Title { get; init; }

    /// <summary>
    /// Description de l'enregistrement.
    /// </summary>
    public string? Description { get; init; }

    /// <summary>
    /// Description courte ou libellé.
    /// </summary>
    public string? ShortcutDescription { get; init; }

    /// <summary>
    /// Description de la valeur retournée par la fonction.
    /// </summary>
    public string? ReturnDesc { get; init; }

    /// <summary>
    /// Template associé à l'enregistrement.
    /// </summary>
    public string? Template { get; init; }

    /// <summary>
    /// Type de l'enregistrement.
    /// </summary>
    public string? Type { get; init; }

    /// <summary>
    /// Compatibilité navigateurs déclarée pour la fonction.
    /// </summary>
    public string? BrowsersCompatibility { get; init; }

    /// <summary>
    /// Image associée à l'enregistrement (stockée en string).
    /// </summary>
    public string? Img { get; init; }

    /// <summary>
    /// Retourne une copie du record avec Dmod mis à jour à la date courante UTC.
    /// Utilisé lors de l'import pour tracer la date de modification.
    /// </summary>
    public CrmRecord WithUpdatedDmod() => this with { Dmod = DateTime.UtcNow };
    
    /// <summary>
    /// Mappe une ligne du SqlDataReader vers un CrmRecord.
    /// Utilise Convert.ToString pour gérer tous les types SQL sans lever d'InvalidCastException
    /// (la BD peut retourner string, decimal, int selon les colonnes).
    /// Les valeurs DBNull sont converties en null C#.
    /// </summary>
    /// <param name="reader">Lecteur SQL positionné sur la ligne courante.</param>
    /// <returns>Un CrmRecord immuable représentant la ligne lue.</returns>
    public static CrmRecord FromReader(SqlDataReader reader) => new()
    {
        // Nrid est obligatoire , valeur par défaut string.Empty si null inattendu
        Nrid   = Convert.ToString(reader.GetValue(reader.GetOrdinal("nrid"))) ?? string.Empty,

        // Colonnes identifiants peuvent être null en BD
        Rid    = reader.IsDBNull(reader.GetOrdinal("rid"))     ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("rid"))),
        Rmod   = reader.IsDBNull(reader.GetOrdinal("rmod"))    ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("rmod"))),
        LangId = reader.IsDBNull(reader.GetOrdinal("lang_id")) ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("lang_id"))),
        TierId = reader.IsDBNull(reader.GetOrdinal("tier_id")) ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("tier_id"))),
        Dmod = reader.IsDBNull(reader.GetOrdinal("dmod"))
            ? null
            : Convert.ToDateTime(reader.GetValue(reader.GetOrdinal("dmod"))),
        
        // Colonnes textuelles
        FunctionName          = reader.IsDBNull(reader.GetOrdinal("function_name"))          ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("function_name"))),
        FunctionText          = reader.IsDBNull(reader.GetOrdinal("function_text"))          ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("function_text"))),
        Title                 = reader.IsDBNull(reader.GetOrdinal("title"))                  ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("title"))),
        Description           = reader.IsDBNull(reader.GetOrdinal("description"))            ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("description"))),
        ShortcutDescription   = reader.IsDBNull(reader.GetOrdinal("shortcut_description"))   ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("shortcut_description"))),
        ReturnDesc            = reader.IsDBNull(reader.GetOrdinal("returndesc"))             ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("returndesc"))),
        Template              = reader.IsDBNull(reader.GetOrdinal("template"))               ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("template"))),
        Type                  = reader.IsDBNull(reader.GetOrdinal("type"))                   ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("type"))),
        BrowsersCompatibility = reader.IsDBNull(reader.GetOrdinal("browsers_compatibility")) ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("browsers_compatibility"))),
        Img                   = reader.IsDBNull(reader.GetOrdinal("img"))                    ? null : Convert.ToString(reader.GetValue(reader.GetOrdinal("img"))),
    };
}