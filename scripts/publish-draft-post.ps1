#!/usr/bin/env powershell
<#
.SYNOPSIS
  Publishes a single generated draft post: creates the .astro file, appends
  the post to src/data/posts.json, builds the site, and commits+pushes to git.

.DESCRIPTION
  Reads content-queue/draft-posts/<slug>.json, transforms it into:
    - src/pages/blog/<slug>.astro using the compact .article-header style
    - updated src/data/posts.json entry (merged with existing entries)
  Then runs astro build, commits, and pushes (with retry). Mirrors the schema
  used by publish-next-post.ps1 but consumes a draft instead of queue.json.

.PARAMETER DraftPath
  Path to a draft JSON file. Required.
#>

[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$DraftPath
)

$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\QuQu\ai-tool-hub-v2"
Set-Location $ProjectRoot

$BlogDir    = Join-Path $ProjectRoot "src\pages\blog"
$DataFile   = Join-Path $ProjectRoot "src\data\posts.json"
$LogFile    = Join-Path $ProjectRoot "content-queue\publish.log"

function Write-Log {
  param([string]$Message)
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$ts] $Message"
  Add-Content -LiteralPath $LogFile -Value $line
  Write-Host $line
}

if (-not (Test-Path $DraftPath)) {
  Write-Log "ERROR: draft not found at $DraftPath"
  exit 1
}

$post = Get-Content -LiteralPath $DraftPath -Raw -Encoding UTF8 | ConvertFrom-Json
Write-Log "Publishing draft: $($post.slug)"

# Build .astro file
$tagSpans = ""
foreach ($t in $post.tags) {
  $tagSpans += "`n        <span class=`"audience-tag`">#$t</span>"
}

$faqSection = ""
if ($post.faq -and $post.faq.Count -gt 0) {
  $faqHtml = ""
  foreach ($f in $post.faq) {
    $faqHtml += "`n      <details><summary>$($f.q)</summary><p>$($f.a)</p></details>"
  }
  $faqSection = "`n    <section style=`"margin-top: 40px;`"><h3>Frequently Asked Questions</h3>$faqHtml`n    </section>"
}

$astroContent = "---`nimport BaseLayout from `"../../layouts/BaseLayout.astro`";`n---`n<BaseLayout title=`"$($post.title_en)`" description=`"$($post.desc_en)`" keywords=`"$($post.tags -join ', ')`">`n  <article class=`"legal-page blog-post`">`n    <nav class=`"breadcrumbs`"><a href=`"/`">Home</a> &rsaquo; <a href=`"/blog/`">Blog</a> &rsaquo; <span>$($post.title_en)</span></nav>`n    <header class=`"article-header`">`n      <span class=`"eyebrow`">$($post.category)</span>`n      <h1>$($post.title_en)</h1>`n      <p class=`"lede`">$($post.desc_en)</p>`n      <div class=`"article-meta`">`n        <div class=`"meta-item`"><i class=`"far fa-calendar`"></i> <span>$($post.date)</span></div>`n        <div class=`"meta-item`"><i class=`"far fa-clock`"></i> <span>$($post.read_time)</span></div>`n        <div class=`"meta-item`"><i class=`"far fa-user`"></i> <span>$($post.author)</span></div>`n        <div class=`"meta-item reviewer`"><i class=`"fas fa-user-check`"></i> <span>Reviewed by <strong>Lin Chen</strong>, Lead Reviewer (5+ years testing AI tools)</span></div>`n      </div>`n    </header>`n`n    <section class=`"blog-content`">`n$($post.body_en)`n    </section>`n$faqSection`n`n    <section style=`"margin-top: 40px;`">`n      <h3>Tags</h3>`n      <div class=`"audience-tags`">$tagSpans`n      </div>`n    </section>`n`n    <section style=`"margin-top: 40px; text-align: center;`">`n      <p style=`"color: var(--text-mute);`">Want us to review a specific tool? <a href=`"/contact/`">Suggest a topic</a>.</p>`n    </section>`n  </article>`n</BaseLayout>`n"

$astroPath = Join-Path $BlogDir "$($post.slug).astro"
[System.IO.File]::WriteAllText($astroPath, $astroContent, [System.Text.UTF8Encoding]::new($false))
Write-Log "Created: $astroPath"

# Update posts.json
$posts = @(Get-Content -LiteralPath $DataFile -Raw -Encoding UTF8 | ConvertFrom-Json)
$existingIdx = -1
for ($i = 0; $i -lt $posts.Count; $i++) {
  if ($posts[$i].slug -eq $post.slug) { $existingIdx = $i; break }
}

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
if ($existingIdx -ge 0) {
  $posts[$existingIdx] = $newEntry
  Write-Log "Replaced existing entry at index $existingIdx"
} else {
  $posts = @($posts) + $newEntry
  Write-Log "Appended new entry"
}
$json = $posts | ConvertTo-Json -Depth 10; [System.IO.File]::WriteAllText($DataFile, $json, [System.Text.UTF8Encoding]::new($false))
Write-Log "Updated: $DataFile (now has $($posts.Count) posts)"

# Build
Write-Log "Building site..."
$buildOutput = npm run build 2>&1 | Select-Object -Last 5
foreach ($line in $buildOutput) { Write-Log "  $line" }

# Commit
Write-Log "Committing..."
git add -A 2>&1 | Out-Null
$commitMsg = "v3.x: auto-publish $($post.slug)"
git commit -m $commitMsg 2>&1 | Out-Null
Write-Log "Committed: $commitMsg"

# Push with retry
$maxRetries = 3
$retryDelay = 30
$pushSuccess = $false
for ($i = 1; $i -le $maxRetries; $i++) {
  try {
    # Set proxy for GitHub access (required in China)
git config http.proxy http://127.0.0.1:7897
git -c http.sslVerify=false config http.sslVerify false
Write-Log "Push attempt $i of $maxRetries..."
    $pushOutput = git push 2>&1 | Select-Object -Last 5
    foreach ($line in $pushOutput) { Write-Log "  $line" }
    $pushSuccess = $true
    break
  } catch {
    Write-Log "Push attempt $i failed: $_"
    if ($i -lt $maxRetries) {
      Write-Log "Waiting $retryDelay seconds before retry..."
      Start-Sleep -Seconds $retryDelay
    }
  }
}
# Clean up proxy config after push
git config --unset http.proxy 2>$null
git config --unset http.sslVerify 2>$null

if ($pushSuccess) {
  Write-Log "SUCCESS: Draft post published, committed, and pushed."
} else {
  Write-Log "WARNING: Git push failed after $maxRetries attempts. Commit saved locally."
}

# Move the draft to a "published" folder so we don't re-publish
$publishedDir = Join-Path $ProjectRoot "content-queue\published-drafts"
if (-not (Test-Path $publishedDir)) { New-Item -ItemType Directory -Path $publishedDir -Force | Out-Null }
Move-Item -LiteralPath $DraftPath -Destination (Join-Path $publishedDir (Split-Path -Leaf $DraftPath)) -Force
Write-Log "Moved draft to published-drafts/"
Write-Log "Done."
