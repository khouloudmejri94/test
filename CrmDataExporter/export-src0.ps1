param(
    [Parameter(Mandatory = $true)]
    [string]$ServerInstance,

    [Parameter(Mandatory = $true)]
    [string]$Database,

    [Parameter(Mandatory = $false)]
    [string]$Schema = "dbo",

    [Parameter(Mandatory = $false)]
    [string]$Table = "src0",

    [Parameter(Mandatory = $false)]
    [string]$IdColumn = "id",

    [Parameter(Mandatory = $false)]
    [string]$NameColumn = "nom_fonction",

    [Parameter(Mandatory = $false)]
    [string]$CodeColumn = "code_source",

    [Parameter(Mandatory = $false)]
    [string]$OutputDir = ".\export\src0",

    [Parameter(Mandatory = $false)]
    [switch]$IntegratedSecurity = $true,

    [Parameter(Mandatory = $false)]
    [string]$Username,

    [Parameter(Mandatory = $false)]
    [string]$Password
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Quote-SqlIdentifier {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        throw "Identifiant SQL vide."
    }

    return "[" + ($Value -replace "]", "]]") + "]"
}

function Sanitize-FileName {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return "sans_nom"
    }

    $invalid = [System.IO.Path]::GetInvalidFileNameChars()
    $sanitized = -join ($Value.ToCharArray() | ForEach-Object {
        if ($invalid -contains $_) { "_" } else { $_ }
    })

    if ([string]::IsNullOrWhiteSpace($sanitized)) {
        return "sans_nom"
    }

    return $sanitized.Trim()
}

function Get-SqlRows {
    param(
        [string]$Server,
        [string]$Db,
        [string]$QueryText,
        [bool]$UseIntegratedSecurity,
        [string]$User,
        [string]$Pass
    )

    $invokeParams = @{
        ServerInstance = $Server
        Database       = $Db
        Query          = $QueryText
    }

    if (-not $UseIntegratedSecurity) {
        if ([string]::IsNullOrWhiteSpace($User) -or [string]::IsNullOrWhiteSpace($Pass)) {
            throw "Authentification SQL demandee mais Username/Password manquants."
        }
        $securePassword = ConvertTo-SecureString $Pass -AsPlainText -Force
        $credential = [System.Management.Automation.PSCredential]::new($User, $securePassword)
        $invokeParams.Credential = $credential
    }

    return Invoke-Sqlcmd @invokeParams
}

if (-not (Get-Command Invoke-Sqlcmd -ErrorAction SilentlyContinue)) {
    throw "Invoke-Sqlcmd est introuvable. Installez le module SqlServer: Install-Module SqlServer -Scope CurrentUser"
}

$qSchema = Quote-SqlIdentifier $Schema
$qTable = Quote-SqlIdentifier $Table
$qId = Quote-SqlIdentifier $IdColumn
$qName = Quote-SqlIdentifier $NameColumn
$qCode = Quote-SqlIdentifier $CodeColumn

$query = @"
SELECT
    CAST($qId AS NVARCHAR(256)) AS row_id,
    CAST($qName AS NVARCHAR(4000)) AS row_name,
    CAST($qCode AS NVARCHAR(MAX)) AS row_code
FROM $qSchema.$qTable
ORDER BY $qId
"@

$rows = Get-SqlRows `
    -Server $ServerInstance `
    -Db $Database `
    -QueryText $query `
    -UseIntegratedSecurity $IntegratedSecurity.IsPresent `
    -User $Username `
    -Pass $Password

if (-not (Test-Path -Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$exported = 0
$indexPath = Join-Path $OutputDir "index.csv"
"row_id,row_name,file_name" | Set-Content -Path $indexPath -Encoding UTF8

foreach ($row in $rows) {
    $id = [string]$row.row_id
    $name = [string]$row.row_name
    $code = [string]$row.row_code

    if ([string]::IsNullOrWhiteSpace($id)) {
        $id = "{0:D6}" -f $exported
    }

    $safeName = Sanitize-FileName $name
    $fileName = "{0}_{1}.sql" -f $id, $safeName
    $filePath = Join-Path $OutputDir $fileName

    if ($null -eq $code) {
        $code = ""
    }

    [System.IO.File]::WriteAllText($filePath, $code, [System.Text.Encoding]::UTF8)
    ('"{0}","{1}","{2}"' -f ($id -replace '"', '""'), ($name -replace '"', '""'), ($fileName -replace '"', '""')) | Add-Content -Path $indexPath -Encoding UTF8
    $exported++
}

Write-Host "Export termine: $exported fichier(s) dans '$OutputDir'."
Write-Host "Index genere: $indexPath"
