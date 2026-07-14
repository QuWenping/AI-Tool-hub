#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Main weekly orchestrator. Fetches trends, generates a post, publishes it.

.DESCRIPTION
  Single entry point for the Windows Scheduled Task. Runs:
    1. fetch-weekly-trends.ps1    - collect signals
    2. generate-post-from-trends.ps1 - Codex writes the article
    3. publish-draft-post.ps1     - .astro + posts.json + build + commit + push

  If anything fails, the orchestrator logs the error but does not throw.
  Drafts that fail to publish stay in content-queue/draft-posts/ for next run.

.NOTES
  This is the script the Windows Task Scheduler invokes.
  Schedule: Monday, Wednesday, Friday at 10:00 AM (Asia/Shanghai).
#>

[CmdletBinding()]
param(
  [switch]$SkipFetch = $false,
  [switch]$SkipGenerate = $false,
  [switch]$SkipPublish = $false
)

$ErrorActionPreference = "Continue"

$ProjectRoot = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$LogFile = Join-Path $ProjectRoot "content-queue\orchestrator.log"
$DraftDir = Join-Path $ProjectRoot "content-queue\draft-posts"

function Write-Log {
  param([string]$Message)
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$ts] $Message"
  Add-Content -LiteralPath $LogFile -Value $line
  Write-Host $line
}

Write-Log "=== Weekly publish orchestrator START ==="
$startTime = Get-Date

# ---------------------------------------------------------------------------
# Step 1: fetch trends
# ---------------------------------------------------------------------------
if (-not $SkipFetch) {
  Write-Log "STEP 1/3: Fetching trends..."
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$ProjectRoot\scripts\fetch-weekly-trends.ps1"
  if ($LASTEXITCODE -ne 0) {
    Write-Log "WARN: trends fetch exited with $LASTEXITCODE, continuing"
  }
} else {
  Write-Log "STEP 1/3: Skipped (--SkipFetch)"
}

# ---------------------------------------------------------------------------
# Step 2: generate post
# ---------------------------------------------------------------------------
$draftPath = $null
if (-not $SkipGenerate) {
  Write-Log "STEP 2/3: Generating post with Codex CLI..."
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$ProjectRoot\scripts\generate-post-from-trends.ps1"
  if ($LASTEXITCODE -ne 0) {
    Write-Log "ERROR: post generation failed (exit $LASTEXITCODE). Aborting."
    exit 1
  }
  # Pick the newest draft
  $newest = Get-ChildItem -Path $DraftDir -Filter "*.json" |
            Where-Object { $_.Name -notmatch "codex-last-msg" } |
            Sort-Object LastWriteTime -Descending |
            Select-Object -First 1
  if (-not $newest) {
    Write-Log "ERROR: no draft was produced. Aborting."
    exit 1
  }
  $draftPath = $newest.FullName
  Write-Log "Generated draft: $draftPath"
} else {
  Write-Log "STEP 2/3: Skipped (--SkipGenerate)"
  # Pick the newest draft
  $newest = Get-ChildItem -Path $DraftDir -Filter "*.json" |
            Where-Object { $_.Name -notmatch "codex-last-msg" } |
            Sort-Object LastWriteTime -Descending |
            Select-Object -First 1
  if ($newest) {
    $draftPath = $newest.FullName
    Write-Log "Using existing draft: $draftPath"
  }
}

# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
# Step 2.5: Generate and insert blog images (Pollinations.ai, free)
# ---------------------------------------------------------------------------
if ($draftPath -and -not $SkipGenerate) {
  Write-Log "STEP 2.5/4: Generating blog images..."
  $draftJson = Get-Content -LiteralPath $draftPath -Raw -Encoding UTF8 | ConvertFrom-Json
  $imgSlug = $draftJson.slug
  $imgTitle = $draftJson.title_en
  $imgKeywords = @()
  if ($draftJson.tags) { $imgKeywords = ($draftJson.tags | Select-Object -First 3) }
  $astroFile = Join-Path $ProjectRoot "src\pages\blog\$imgSlug.astro"
  # Note: .astro file is created in Step 3, so we generate images first
  # and insert them after Step 3 creates the file
  $imgDir = Join-Path $ProjectRoot "public\images\blog\$imgSlug"
  if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force | Out-Null }
  $nodeArgs = @("$imgSlug", "$imgTitle") + $imgKeywords
  & node "\scripts\generate-blog-images.cjs" $nodeArgs 2>&1 | ForEach-Object { Write-Log "  $_" }
  Write-Log "Blog images generated."
}

# ---------------------------------------------------------------------------
# Step 3: publish
# ---------------------------------------------------------------------------
# Step 3: publish
# ---------------------------------------------------------------------------
if (-not $SkipPublish) {
  if (-not $draftPath) {
    Write-Log "ERROR: no draft available to publish. Aborting."
    exit 1
  }
  # Step 3.5: Insert images into .astro file
$astroFile = Join-Path $ProjectRoot "src\pages\blog\$($post.slug).astro"
if (Test-Path $astroFile) {
  Write-Log "STEP 3.5: Inserting images into .astro file..."
  $imgKeywords = @()
  if ($post.tags) { $imgKeywords = ($post.tags | Select-Object -First 3) }
  $nodeArgs = @($post.slug, $astroFile, $post.title_en) + $imgKeywords
  & node "$ProjectRoot\scripts\insert-blog-images.cjs" $nodeArgs 2>&1 | ForEach-Object { Write-Log "  $_" }
}

Write-Log "STEP 3/3: Publishing $draftPath ..."
  & powershell -NoProfile -ExecutionPolicy Bypass -File "$ProjectRoot\scripts\publish-draft-post.ps1" -DraftPath $draftPath
  if ($LASTEXITCODE -ne 0) {
    Write-Log "ERROR: publish failed (exit $LASTEXITCODE)"
    exit 1
  }
} else {
  Write-Log "STEP 3/3: Skipped (--SkipPublish)"
}

$elapsed = (Get-Date) - $startTime
Write-Log ("=== Orchestrator DONE ({0:N0}s) ===" -f $elapsed.TotalSeconds)
