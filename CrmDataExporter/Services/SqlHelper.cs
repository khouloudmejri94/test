using Microsoft.Data.SqlClient;
using CrmDataExporter.Models;

namespace CrmDataExporter.Services;

/// <summary>
/// Utilitaires partagés entre les commandes Export et Import.
/// Responsabilités : lecture BD et validation des noms de tables.
/// </summary>
public static class SqlHelper
{
    /// <summary>
    /// Charge toutes les lignes d'une table SQL et les mappe en liste de CrmRecord.
    /// </summary>
    /// <param name="connectionString">Chaîne de connexion SQL Server.</param>
    /// <param name="safeTableName">Nom de table déjà sécurisé (ex: [sysadm].[scr0]).</param>
    /// <returns>Liste des enregistrements mappés.</returns>
    public static async Task<List<CrmRecord>> LoadRowsAsync(string connectionString, string safeTableName)
    {
        var records = new List<CrmRecord>();
        var sql = $"SELECT * FROM {safeTableName}";

        // Ouvre la connexion SQL Server
        await using var connection = new SqlConnection(connectionString);
        await connection.OpenAsync();

        // Exécute la requête avec un timeout de 120 secondes
        await using var command = new SqlCommand(sql, connection);
        command.CommandTimeout = 120;
        await using var reader = await command.ExecuteReaderAsync();

        // Mappe chaque ligne en CrmRecord via le mapper statique
        while (await reader.ReadAsync())
            records.Add(CrmRecord.FromReader(reader));

        return records;
    }

    /// <summary>
    /// Valide et formate un nom de table pour éviter les injections SQL.
    /// Accepte les formats : "table" ou "schema.table".
    /// Chaque partie est encadrée de crochets : [schema].[table].
    /// </summary>
    /// <param name="tableName">Nom brut fourni par l'utilisateur (ex: sysadm.scr0).</param>
    /// <returns>Nom sécurisé utilisable dans une requête SQL (ex: [sysadm].[scr0]).</returns>
    /// <exception cref="ArgumentException">Si le nom est vide, mal formaté ou contient des caractères invalides.</exception>
    public static string BuildSafeSqlTableName(string tableName)
    {
        if (string.IsNullOrWhiteSpace(tableName))
            throw new ArgumentException("Le nom de table est vide.");

        // Découpe sur le point : "sysadm.scr0" → ["sysadm", "scr0"]
        string[] parts = tableName.Split('.', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        // Accepte uniquement "table" ou "schema.table"
        if (parts.Length is < 1 or > 2)
            throw new ArgumentException("Format accepté : table ou schema.table");

        var safeParts = new List<string>();
        foreach (string part in parts)
        {
            // Rejette tout caractère autre que lettres, chiffres et underscore
            if (!System.Text.RegularExpressions.Regex.IsMatch(part, "^[A-Za-z0-9_]+$"))
                throw new ArgumentException($"Nom de table invalide : '{tableName}'");

            // Encadre chaque partie de crochets pour échapper les mots réservés SQL
            safeParts.Add($"[{part}]");
        }

        // Reconstruit : "[sysadm].[scr0]"
        return string.Join('.', safeParts);
    }
}