param([string]$Token)
$ErrorActionPreference = "Stop"
$Site = "https://thebestaitoolsreview.com"
$tokenFile = Join-Path $PSScriptRoot ".baidu-token"
if (-not $Token -and (Test-Path $tokenFile)) { $Token = (Get-Content $tokenFile -Raw).Trim() }
if (-not $Token) { Write-Host "缺少 token：传 -Token 或把 token 写入 scripts/.baidu-token"; exit 1 }
$endpoint = "http://data.zz.baidu.com/urls?site=$Site&token=$Token"
$sm = Join-Path $PSScriptRoot "..\dist\sitemap-0.xml"
if (-not (Test-Path $sm)) { Write-Host "未找到 dist\sitemap-0.xml，请先 npm run build"; exit 1 }
$xml = Get-Content $sm -Raw -Encoding UTF8
$urls = [regex]::Matches($xml, '<loc>(.*?)</loc>') | ForEach-Object { $_.Groups[1].Value }
Write-Host ("待推送 URL 数: " + $urls.Count)
$body = $urls -join "`n"
$resp = Invoke-WebRequest -Uri $endpoint -Method Post -Body $body -ContentType "text/plain" -UseBasicParsing -TimeoutSec 60
Write-Host ("百度返回: " + $resp.Content)