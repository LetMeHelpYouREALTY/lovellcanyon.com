# Quick repo health summary for lovellcanyon.com
# Usage: pwsh scripts/git/status-summary.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Push-Location (Resolve-Path (Join-Path $PSScriptRoot "../.."))

Write-Host "`n=== Branch ===" -ForegroundColor Cyan
git branch -vv

Write-Host "`n=== Working tree (short) ===" -ForegroundColor Cyan
git status --short

$modified = (git status --short | Measure-Object).Count
if ($modified -gt 0) {
  Write-Host "`n=== Diff stat ===" -ForegroundColor Cyan
  git diff --stat
}

Write-Host "`n=== Recent commits ===" -ForegroundColor Cyan
git log -5 --oneline

Write-Host "`n=== Stale remote branches (sample) ===" -ForegroundColor Cyan
git fetch --prune 2>$null
git branch -r | Select-String -NotMatch "origin/(HEAD|main)" | Select-Object -First 15

Write-Host "`nTip: see docs/GIT_WORKFLOW.md for commit scopes and atomic staging.`n" -ForegroundColor DarkGray

Pop-Location
