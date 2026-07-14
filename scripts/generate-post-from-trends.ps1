#!/usr/bin/env powershell
<#
.SYNOPSIS
  Generates one blog post from the latest trends-*.json file using Codex CLI.

.DESCRIPTION
  Reads content-queue/trends-YYYY-MM-DD.json (or the most recent), assembles a
  prompt with the raw signals, runs `codex exec` non-interactively, and parses
  the response as a structured post object. Writes the post to
  content-queue/draft-posts/<slug>.json in the same shape as queue.json entries.

.PARAMETER TrendsFile
  Optional path to a specific trends-*.json file. Defaults to the most recent.

.PARAMETER SeedSlug
  Optional seed for the slug (otherwise derived from the topic).

.PARAMETER Author
  Author name to attribute. Default: "AI Tool Hub Editorial".

.PARAMETER Model
  Model slug to pass to codex exec. Default: ark-code-latest (Volces Ark via CC Switch).
#>

[CmdletBinding()]
param(
  [string]$TrendsFile = "",
  [string]$SeedSlug = "",
  [string]$Author = "AI Tool Hub Editorial",
  [string]$Model = "ark-code-latest"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$QueueDir   = Join-Path $ProjectRoot "content-queue"
$RawDir     = Join-Path $QueueDir "trends-raw"
$DraftDir   = Join-Path $QueueDir "draft-posts"
$LogFile    = Join-Path $QueueDir "generate.log"

if (-not (Test-Path $DraftDir)) { New-Item -ItemType Directory -Path $DraftDir -Force | Out-Null }

function Write-Log {
  param([string]$Message)
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$ts] $Message"
  Add-Content -LiteralPath $LogFile -Value $line
  Write-Host $line
}

# ---------------------------------------------------------------------------
# Pick trends file
# ---------------------------------------------------------------------------
if (-not $TrendsFile) {
  $latest = Get-ChildItem -Path $QueueDir -Filter "trends-*.json" |
            Sort-Object LastWriteTime -Descending |
            Select-Object -First 1
  if (-not $latest) {
    Write-Log "ERROR: no trends-*.json file found. Run fetch-weekly-trends.ps1 first."
    exit 1
  }
  $TrendsFile = $latest.FullName
}
Write-Log "Using trends file: $TrendsFile"

$index = Get-Content -LiteralPath $TrendsFile -Raw | ConvertFrom-Json
$date = $index.date
if (-not $date) { $date = (Get-Date -Format "yyyy-MM-dd") }

# ---------------------------------------------------------------------------
# Build prompt with raw signals
# ---------------------------------------------------------------------------
$signalParts = @()

if ($index.exa_queries) {
  foreach ($eq in $index.exa_queries) {
    $p = Join-Path $QueueDir $eq.raw_file
    if (Test-Path $p) {
      $content = Get-Content -LiteralPath $p -Raw
      $signalParts += "EXA SEARCH: $($eq.query)`n$content`n"
    }
  }
}
foreach ($prop in @("hn_top_file","hn_show_file","github_trending_file","producthunt_file")) {
  $rel = $index.$prop
  if ($rel) {
    $p = Join-Path $QueueDir $rel
    if (Test-Path $p) {
      $content = Get-Content -LiteralPath $p -Raw
      $signalParts += ($prop.ToUpper() -replace "_"," ") + ":`n$content`n"
    }
  }
}

$signals = ($signalParts -join "`n----`n")
$signalsCap = if ($signals.Length -gt 50000) { $signals.Substring(0,50000) + "...[truncated]" } else { $signals }

# Hard rule: require JSON-only output. The codex model often "talks first" and
# then writes JSON, breaking downstream parsing. We split the instruction into
# a system-style header that explicitly forbids preamble, and a clear spec.
$prompt = @"
SYSTEM CONSTRAINTS (do not violate):
1. Your reply must be EXACTLY ONE JSON object. No prose before it, no prose after it.
2. Do NOT use markdown code fences (no ```json and no ```).
3. The first character of your reply must be `{` and the last character must be `}`.
4. Do not output any "thinking", "analysis", or "let me explain" text.
5. Do not use tool calls to write the file - just output the JSON in your final message.

Now follow the user request below and output only the JSON object.

USER REQUEST:

You are the lead writer for "AI Tool Hub" (thebestaitoolsreview.com), an English-language AI tool review site.
The current date is $date.

Below are raw trending signals from Exa search, Hacker News, GitHub Trending, and Product Hunt.
Pick the SINGLE most interesting, evergreen, and SEO-worthy story that fits an "AI tools / AI development" angle.
Ignore purely consumer/non-AI trends.

Target JSON shape (exact field names, exact structure - escape inner double quotes with backslash):

{"slug":"kebab-case-slug-with-year","title_en":"Compelling English title, max 80 chars, includes a number or year","title_zh":"Same idea in Simplified Chinese, max 40 chars","desc_en":"1-2 sentence English meta description, max 200 chars","desc_zh":"Same idea in Simplified Chinese, max 120 chars","category":"one of: comparison, tutorial, list, news, deep-dive, productivity, marketing, design, content-writing, image, code, video, audio, research, education, customer-support, data-analysis, sales, job-search, small-business, finance, product-management, agents, llm, tools, beginner, prompt","date":"$date","read_time":"N min read","author":"$Author","tags":["3-6 lowercase hyphenated tags"],"body_en":"Full article body as HTML (h2/h3/p/ul/ol/li/strong/blockquote/table). 1500-2500 words. First paragraph = clear lede (1-2 sentences that hook the reader). Cover: what it is, why it matters now, who should care, comparison/alternatives, pricing, our take, 2026 trends, FAQ, call to action.","faq":[{"q":"Question 1?","a":"Answer 1 (1-2 sentences)."},{"q":"Question 2?","a":"Answer 2."},{"q":"Question 3?","a":"Answer 3."}]}

The body_en must be valid HTML that can be dropped into an .astro template. Complete the entire JSON object - do not truncate body_en.

TRENDING SIGNALS (research, then write):
$signalsCap
"@

# ---------------------------------------------------------------------------
# Run Codex
# ---------------------------------------------------------------------------
$outMsg = Join-Path $DraftDir "codex-last-msg-$date.txt"
if (Test-Path $outMsg) { Remove-Item $outMsg -Force }

Write-Log "Calling codex exec (model=$Model)..."
# Use stdin to avoid command line length issues
$prompt | & codex exec -m $Model --dangerously-bypass-approvals-and-sandbox -c "model_reasoning_effort=low" -o $outMsg - 2>&1 | Out-Null
$codexExit = $LASTEXITCODE
Write-Log "Codex exit: $codexExit"

if (-not (Test-Path $outMsg)) {
  Write-Log "ERROR: codex did not write a last message file"
  exit 1
}

$body = Get-Content -LiteralPath $outMsg -Raw
Write-Log "Last message length: $($body.Length)"

# Strip markdown code fences if any
$body = $body -replace '(?s)^```json\s*', ''
$body = $body -replace '(?s)```\s*$', ''

# ---------------------------------------------------------------------------
# Parse JSON - find the largest top-level { ... } block
# ---------------------------------------------------------------------------
$candidates = New-Object System.Collections.ArrayList
$depth = 0
$start = -1
for ($i = 0; $i -lt $body.Length; $i++) {
  $c = $body[$i]
  if ($c -eq '{') {
    if ($depth -eq 0) { $start = $i }
    $depth++
  } elseif ($c -eq '}') {
    $depth--
    if ($depth -eq 0 -and $start -ge 0) {
      $cand = $body.Substring($start, $i - $start + 1)
      [void]$candidates.Add($cand)
      $start = -1
    }
  }
}

$jsonText = $null
if ($candidates.Count -gt 0) {
  $jsonText = $candidates | Sort-Object Length -Descending | Select-Object -First 1
  Write-Log "Found $($candidates.Count) JSON block(s); largest: $($jsonText.Length) chars"
}

if (-not $jsonText) {
  Write-Log "ERROR: no JSON braces found in codex output"
  Write-Log "Output head: $($body.Substring(0, [Math]::Min(800, $body.Length)))"
  exit 1
}

# Try to parse
$post = $null
try {
  $post = $jsonText | ConvertFrom-Json
} catch {
  Write-Log "ERROR: failed to parse JSON: $_"
  Write-Log "JSON text head: $($jsonText.Substring(0, [Math]::Min(500, $jsonText.Length)))"
  exit 1
}

# Fallback fields
if (-not $post.slug -or $post.slug -eq "") { $post.slug = if ($SeedSlug) { $SeedSlug } else { "trending-" + (Get-Date -Format "yyyy-MM-dd") } }
if (-not $post.tags -or $post.tags.Count -eq 0) { $post.tags = @("ai-tools", "trending", "2026") }
if (-not $post.read_time) { $post.read_time = "8 min read" }
if (-not $post.date) { $post.date = $date }
if (-not $post.author) { $post.author = $Author }
if (-not $post.faq) { $post.faq = @() }

$post | ConvertTo-Json -Depth 12 | Out-File -LiteralPath (Join-Path $DraftDir "$($post.slug).json") -Encoding UTF8
Write-Log "Wrote draft: content-queue/draft-posts/$($post.slug).json"
Write-Log "Done."
