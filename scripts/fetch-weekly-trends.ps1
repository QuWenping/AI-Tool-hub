#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Fetches AI / tech trends from multiple sources for the weekly blog post pipeline.

.DESCRIPTION
  Pulls signals from:
   - Exa AI search (multiple curated queries)
   - Hacker News top stories
   - Hacker News Show HN
   - GitHub trending repos (weekly)
   - Product Hunt today
  Writes raw responses to content-queue/trends-raw/ and a single index file
  to content-queue/trends-YYYY-MM-DD.json.

.NOTES
  Requires: mcporter (exa) and opencli (hn, github-trending, producthunt)
#>

[CmdletBinding()]
param()

$ErrorActionPreference = "Continue"

$ProjectRoot = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$Date       = Get-Date -Format "yyyy-MM-dd"
$OutFile    = Join-Path $ProjectRoot "content-queue\trends-$Date.json"
$LogFile    = Join-Path $ProjectRoot "content-queue\trends-fetch.log"
$SourceDir  = Join-Path $ProjectRoot "content-queue\trends-raw"

if (-not (Test-Path $SourceDir)) { New-Item -ItemType Directory -Path $SourceDir -Force | Out-Null }

function Write-Log {
  param([string]$Message)
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$ts] $Message"
  Add-Content -LiteralPath $LogFile -Value $line
  Write-Host $line
}

function Safe-Run {
  param(
    [string]$Label,
    [scriptblock]$Block
  )
  Write-Log "Fetching: $Label"
  try {
    $output = & $Block
    $text = ($output | Out-String)
    if ([string]::IsNullOrWhiteSpace($text)) {
      Write-Log "  WARN: $Label returned empty"
      return $null
    }
    Write-Log "  OK: $Label (length: $($text.Length))"
    return $text
  }
  catch {
    Write-Log "  ERROR: $Label - $_"
    return $null
  }
}

# ---------------------------------------------------------------------------
# Source 1: Exa AI search
# ---------------------------------------------------------------------------
$exaQueries = @(
  "new AI tools released 2026",
  "best AI tool launches this week 2026",
  "AI tool comparison 2026 trending",
  "AI agent framework 2026 popular",
  "LLM model release 2026"
)
$exaResults = @()
foreach ($q in $exaQueries) {
  $raw = Safe-Run "exa: $q" {
    mcporter call "exa.web_search_exa(query: `"$q`", numResults: 5)"
  }
  if ($raw) {
    $rawFile = Join-Path $SourceDir ("exa-" + ($q -replace '[^a-zA-Z0-9]','_') + ".txt")
    $raw | Out-File -LiteralPath $rawFile -Encoding UTF8
    $exaResults += [PSCustomObject]@{
      query = $q
      raw_file = "trends-raw\" + (Split-Path -Leaf $rawFile)
    }
  }
}

# ---------------------------------------------------------------------------
# Source 2: Hacker News top
# ---------------------------------------------------------------------------
$hnTopRaw = Safe-Run "hackernews top" {
  opencli hackernews top -f json --limit 20
}
if ($hnTopRaw) {
  $hnTopRaw | Out-File -LiteralPath (Join-Path $SourceDir "hn-top.json") -Encoding UTF8
}

# ---------------------------------------------------------------------------
# Source 3: Hacker News Show HN
# ---------------------------------------------------------------------------
$hnShowRaw = Safe-Run "hackernews show" {
  opencli hackernews show -f json --limit 20
}
if ($hnShowRaw) {
  $hnShowRaw | Out-File -LiteralPath (Join-Path $SourceDir "hn-show.json") -Encoding UTF8
}

# ---------------------------------------------------------------------------
# Source 4: GitHub trending (weekly)
# ---------------------------------------------------------------------------
$ghRaw = Safe-Run "github-trending weekly" {
  opencli github-trending repos -f json --since weekly --limit 15
}
if ($ghRaw) {
  $ghRaw | Out-File -LiteralPath (Join-Path $SourceDir "github-trending.json") -Encoding UTF8
}

# ---------------------------------------------------------------------------
# Source 5: Product Hunt today
# ---------------------------------------------------------------------------
$phRaw = Safe-Run "producthunt today" {
  opencli producthunt today -f json
}
if ($phRaw) {
  $phRaw | Out-File -LiteralPath (Join-Path $SourceDir "producthunt.json") -Encoding UTF8
}

# ---------------------------------------------------------------------------
# Write index
# ---------------------------------------------------------------------------
$trends = [PSCustomObject]@{
  date = $Date
  exa_queries = $exaResults
  hn_top_file = if (Test-Path (Join-Path $SourceDir "hn-top.json")) { "trends-raw\hn-top.json" } else { $null }
  hn_show_file = if (Test-Path (Join-Path $SourceDir "hn-show.json")) { "trends-raw\hn-show.json" } else { $null }
  github_trending_file = if (Test-Path (Join-Path $SourceDir "github-trending.json")) { "trends-raw\github-trending.json" } else { $null }
  producthunt_file = if (Test-Path (Join-Path $SourceDir "producthunt.json")) { "trends-raw\producthunt.json" } else { $null }
}

$trends | ConvertTo-Json -Depth 5 | Out-File -LiteralPath $OutFile -Encoding UTF8
Write-Log "Wrote trends index: $OutFile"
Write-Log "Done."
