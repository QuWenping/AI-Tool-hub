#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Publishes the next scheduled blog post from the content queue.

.DESCRIPTION
  This script reads the next post from content-queue/queue.json, creates the
  corresponding .astro file in src/pages/blog/, updates src/data/posts.json,
  builds the site, and commits+pushes to git. Designed to run as a Windows
  Scheduled Task (weekly).

.EXAMPLE
  pwsh -File scripts/publish-next-post.ps1
#>

[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

# Paths
$ProjectRoot  = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$QueueFile    = Join-Path $ProjectRoot "content-queue/queue.json"
$BlogDir      = Join-Path $ProjectRoot "src/pages/blog"
$DataFile     = Join-Path $ProjectRoot "src/data/posts.json"
$LogFile      = Join-Path $ProjectRoot "content-queue/publish.log"
$StateFile    = Join-Path $ProjectRoot "content-queue/state.json"

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
$queue = Get-Content -LiteralPath $QueueFile -Raw | ConvertFrom-Json

# Step 2: Load state
$state = @{ lastIndex = -1; published = @() }
if (Test-Path $StateFile) {
  $state = Get-Content -LiteralPath $StateFile -Raw | ConvertFrom-Json
}

# Step 3: Determine next index
$nextIndex = $state.lastIndex + 1
if ($nextIndex -ge $queue.Count) {
  Write-Log "All posts in queue have been published. Refill queue.json to continue."
  exit 0
}

$post = $queue[$nextIndex]
Write-Log "Publishing post #$($nextIndex + 1) of $($queue.Count): $($post.slug)"

# Step 4: Generate .astro file
$astroContent = @"
---
import BaseLayout from "../../layouts/BaseLayout.astro";
---
<BaseLayout title="$($post.title_en)" description="$($post.desc_en)" keywords="$($post.tags -join ', ')">
  <article class="legal-page blog-post">
    <nav class="breadcrumbs"><a href="/">Home</a> &rsaquo; <a href="/blog/">Blog</a> &rsaquo; <span>$($post.title_en)</span></nav>
    <header class="page-hero">
      <span class="eyebrow">$($post.category)</span>
      <h1>$($post.title_en)</h1>
      <p class="lede">$($post.desc_en)</p>
      <p style="color: var(--text-mute); font-size: 14px; margin-top: 16px;">
        <i class="far fa-calendar"></i> $($post.date) &middot; <i class="far fa-clock"></i> $($post.read_time) &middot; <i class="far fa-user"></i> $($post.author)
      </p>
    </header>

    <section class="blog-content">
$($post.body_en)
    </section>

    <section style="margin-top: 40px;">
      <h3>Tags</h3>
      <div class="audience-tags">
        $($post.tags | ForEach-Object { '<span class="audience-tag">#' + $_ + '</span>' } | Join-String -Separator "`n        ")
      </div>
    </section>

    <section style="margin-top: 40px; text-align: center;">
      <p style="color: var(--text-mute);">Want us to review a specific tool? <a href="/contact/">Suggest a topic</a>.</p>
    </section>
  </article>
</BaseLayout>
"@

$astroPath = Join-Path $BlogDir "$($post.slug).astro"
$astroContent | Out-File -LiteralPath $astroPath -Encoding UTF8
Write-Log "Created: $astroPath"

# Step 5: Update posts.json
$posts = Get-Content -LiteralPath $DataFile -Raw | ConvertFrom-Json
$newEntry = @{
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

# Step 7: Git commit and push
Write-Log "Committing and pushing..."
git add -A 2>&1 | Out-Null
$commitMsg = "v2.x: auto-publish $($post.slug)"
git commit -m $commitMsg 2>&1 | Out-Null

# Step 8: Update state
$state.lastIndex = $nextIndex
$state.published = @($state.published) + $post.slug
$state | ConvertTo-Json | Out-File -LiteralPath $StateFile -Encoding UTF8

# Step 9: Push
try {
  $pushOutput = git push 2>&1 | Select-Object -Last 5
  foreach ($line in $pushOutput) { Write-Log "  $line" }
  Write-Log "SUCCESS: Post published, committed, and pushed."
}
catch {
  Write-Log "WARNING: Git push failed (will retry next run). Error: $_"
}

Write-Log "Done."


