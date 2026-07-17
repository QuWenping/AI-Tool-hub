#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Publishes the next scheduled blog post from the content queue.

.DESCRIPTION
  This script reads the next post from content-queue/queue.json, creates the
  corresponding .astro file in src/pages/blog/, updates src/data/posts.json,
  builds the site, and commits+pushes to git. Designed to run as a Windows
  Scheduled Task (weekly).
#>

[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

# Paths
$ProjectRoot  = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$QueueFile    = Join-Path $ProjectRoot "content-queue\queue.json"
$BlogDir      = Join-Path $ProjectRoot "src\pages\blog"
$DataFile     = Join-Path $ProjectRoot "src\data\posts.json"
$LogFile      = Join-Path $ProjectRoot "content-queue\publish.log"
$StateFile    = Join-Path $ProjectRoot "content-queue\state.json"

# Ensure log dir
$LogDir = Split-Path -Parent $LogFile
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }

function Write-Log {
  param([string]$Message)
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$timestamp] $Message"
  Add-Content -LiteralPath $LogFile -Value $line
  Write-Host $line
}

# Step 1: Load queue
if (-not (Test-Path $QueueFile)) {
  Write-Log "ERROR: queue.json not found at $QueueFile"
  exit 1
}
$queue = @(Get-Content -LiteralPath $QueueFile -Raw | ConvertFrom-Json)

# Step 2: Load state
$state = [PSCustomObject]@{ lastIndex = -1; published = @() }
if (Test-Path $StateFile) {
  $loaded = Get-Content -LiteralPath $StateFile -Raw | ConvertFrom-Json
  if ($loaded) { $state = $loaded }
}

# Step 3: Determine next index
$nextIndex = [int]$state.lastIndex + 1
if ($nextIndex -ge $queue.Count) {
  Write-Log "All posts in queue have been published (published $($state.published.Count) of $($queue.Count)). Refill queue.json to continue."
  exit 0
}

$post = $queue[$nextIndex]
Write-Log "Publishing post #$($nextIndex + 1) of $($queue.Count): $($post.slug)"

# Step 4: Generate .astro file
$tagSpans = ""
foreach ($t in $post.tags) {
  $tagSpans += "`n        <span class=`"audience-tag`">#$t</span>"
}

$astroContent = "---`nimport BaseLayout from `"../../layouts/BaseLayout.astro`";`n---`n<BaseLayout title=`"$($post.title_en)`" description=`"$($post.desc_en)`" keywords=`"$($post.tags -join ', ')`">`n  <article class=`"legal-page blog-post`">`n    <nav class=`"breadcrumbs`"><a href=`"/`">Home</a> &rsaquo; <a href=`"/blog/`">Blog</a> &rsaquo; <span>$($post.title_en)</span></nav>`n    <header class=`"page-hero`">`n      <span class=`"eyebrow`">$($post.category)</span>`n      <h1>$($post.title_en)</h1>`n      <p class=`"lede`">$($post.desc_en)</p>`n      <p style=`"color: var(--text-mute); font-size: 14px; margin-top: 16px;`">`n        <i class=`"far fa-calendar`"></i> $($post.date) &middot; <i class=`"far fa-clock`"></i> $($post.read_time) &middot; <i class=`"far fa-user`"></i> $($post.author)`n      </p>`n    </header>`n`n    <section class=`"blog-content`">`n$($post.body_en)`n    </section>`n`n    <section style=`"margin-top: 40px;`">`n      <h3>Tags</h3>`n      <div class=`"audience-tags`">$tagSpans`n      </div>`n    </section>`n`n    <section style=`"margin-top: 40px; text-align: center;`">`n      <p style=`"color: var(--text-mute);`">Want us to review a specific tool? <a href=`"/contact/`">Suggest a topic</a>.</p>`n    </section>`n  </article>`n</BaseLayout>`n"

$astroPath = Join-Path $BlogDir "$($post.slug).astro"
$astroContent | Out-File -LiteralPath $astroPath -Encoding UTF8
Write-Log "Created: $astroPath"

# Step 5: Update posts.json
$posts = @(Get-Content -LiteralPath $DataFile -Raw | ConvertFrom-Json)
$newEntry = [PSCustomObject]@{
  slug = $post.slug
  title_en = $post.title_en
  title_zh = $post.title_zh
  desc_en = $post.desc_en
  desc_zh = $post.desc_zh
  category = $post.category
  date = $post.date
  read_time = $post.read_time
  author = $post.author
  tags = $post.tags
}
$posts = @($posts) + $newEntry
$posts | ConvertTo-Json -Depth 10 | Out-File -LiteralPath $DataFile -Encoding UTF8
Write-Log "Updated: $DataFile (now has $($posts.Count) posts)"

# Step 6: Build
Write-Log "Building site..."
$buildOutput = npm run build 2>&1 | Select-Object -Last 20
foreach ($line in $buildOutput) { Write-Log "  $line" }

# Step 7: Git commit
Write-Log "Committing..."
git add -A 2>&1 | Out-Null
$commitMsg = "v2.x: auto-publish $($post.slug)"
git commit -m $commitMsg 2>&1 | Out-Null
Write-Log "Committed: $commitMsg"

# Step 8: Update state
$state.lastIndex = $nextIndex
$published = @($state.published)
$published += $post.slug
$state = [PSCustomObject]@{ lastIndex = $nextIndex; published = $published }
$state | ConvertTo-Json | Out-File -LiteralPath $StateFile -Encoding UTF8
Write-Log "State updated: lastIndex=$nextIndex"

# Step 9: Push (with retry for network/auth issues)
$maxRetries = 3
$retryDelay = 30
$pushSuccess = $false
for ($i = 1; $i -le $maxRetries; $i++) {
  try {
    Write-Log "Push attempt $i of $maxRetries..."
    $pushOutput = git push 2>&1 | Select-Object -Last 5
    foreach ($line in $pushOutput) { Write-Log "  $line" }
    $pushSuccess = $true
    break
  }
  catch {
    Write-Log "Push attempt $i failed: $_"
    if ($i -lt $maxRetries) {
      Write-Log "Waiting $retryDelay seconds before retry..."
      Start-Sleep -Seconds $retryDelay
    }
  }
}
if ($pushSuccess) {
  Write-Log "SUCCESS: Post published, committed, and pushed."
} else {
  Write-Log "WARNING: Git push failed after $maxRetries attempts. Commit saved locally and will be retried on next run."
}

Write-Log "Done."
