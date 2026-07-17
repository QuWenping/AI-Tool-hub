# Baidu Daily Push Wrapper Script
# Runs automatically via Windows Task Scheduler
# Log file: scripts/baidu-push-log.txt

$projectDir = "C:\Users\QuQu\ai-tool-hub-v2"
$logFile = "$projectDir\scripts\baidu-push-log.txt"
$nodePath = "C:\Program Files\nodejs\node.exe"
$npmPath = "C:\Program Files\nodejs\npm.cmd"

# Start logging
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $logFile -Value "=========================================="
Add-Content -Path $logFile -Value "[$timestamp] Baidu Daily Push Started"
Add-Content -Path $logFile -Value "=========================================="

# Step 1: Build (get latest sitemap)
Set-Location $projectDir
Add-Content -Path $logFile -Value "[$timestamp] Running npm run build..."

$buildOutput = & $npmPath run build 2>&1
$buildSuccess = $LASTEXITCODE -eq 0
Add-Content -Path $logFile -Value "Build result: $(if($buildSuccess){'SUCCESS'}else{'FAILED'})"
Add-Content -Path $logFile -Value ($buildOutput | Select-Object -Last 3 | Out-String)

if (-not $buildSuccess) {
    Add-Content -Path $logFile -Value "Build failed, skipping push."
    exit 1
}

# Step 2: Push to Baidu
$pushTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $logFile -Value "[$pushTime] Running baidu-push-smart.cjs..."

$pushOutput = & $nodePath "$projectDir\scripts\baidu-push-smart.cjs" 2>&1
$pushSuccess = $LASTEXITCODE -eq 0
Add-Content -Path $logFile -Value ($pushOutput | Out-String)

$endTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $logFile -Value "[$endTime] Push completed: $(if($pushSuccess){'SUCCESS'}else{'FAILED'})"
Add-Content -Path $logFile -Value ""

Write-Host "Done. Check log: $logFile"
