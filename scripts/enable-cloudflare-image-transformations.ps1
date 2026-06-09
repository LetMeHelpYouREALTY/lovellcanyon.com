# Enable Cloudflare Image Transformations for lovellcanyon.com
# Requires: $env:CLOUDFLARE_API_TOKEN with Zone Settings Edit permission
#
# Docs:
#   GET/PATCH https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/transformations
#   https://developers.cloudflare.com/images/transform-images/

$ErrorActionPreference = "Stop"

$ZoneId = if ($env:CLOUDFLARE_ZONE_ID) { $env:CLOUDFLARE_ZONE_ID } else { "2d34470f3aa135ceb5d708a5f033085a" }
$Token = $env:CLOUDFLARE_API_TOKEN

if (-not $Token) {
  Write-Error "Set CLOUDFLARE_API_TOKEN (Zone Settings Edit) and re-run."
}

$Headers = @{
  Authorization = "Bearer $Token"
  "Content-Type"  = "application/json"
}

function Invoke-CfSetting {
  param(
    [string]$SettingId,
    [string]$Value
  )

  $Uri = "https://api.cloudflare.com/client/v4/zones/$ZoneId/settings/$SettingId"
  $Body = @{ value = $Value } | ConvertTo-Json

  Write-Host "PATCH $SettingId -> $Value"
  $Response = Invoke-RestMethod -Method Patch -Uri $Uri -Headers $Headers -Body $Body
  if (-not $Response.success) {
    throw "Cloudflare API error on $SettingId : $($Response.errors | ConvertTo-Json -Compress)"
  }
  return $Response.result
}

Write-Host "Zone: $ZoneId"
Write-Host "GET transformations (current):"
Invoke-RestMethod -Method Get -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/settings/transformations" -Headers $Headers | ConvertTo-Json -Depth 5

Invoke-CfSetting -SettingId "transformations" -Value "on"
Invoke-CfSetting -SettingId "image_resizing" -Value "on"

# Allow R2 public bucket + same zone (newline-separated hostnames per Cloudflare dashboard)
$R2Host = if ($env:CLOUDFLARE_R2_PUBLIC_HOST) {
  $env:CLOUDFLARE_R2_PUBLIC_HOST
} else {
  "pub-55f2185197354e748b122f17b695df69.r2.dev"
}

$AllowedOrigins = @(
  "lovellcanyon.com",
  "www.lovellcanyon.com",
  $R2Host
) -join "`n"

Invoke-CfSetting -SettingId "transformations_allowed_origins" -Value $AllowedOrigins

Write-Host ""
Write-Host "Done. Next steps:"
Write-Host "  1. Ensure lovellcanyon.com DNS is proxied (orange cloud) so /cdn-cgi/image/ is served at the edge."
Write-Host "  2. Set NEXT_PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMATIONS=true in Vercel."
Write-Host "  3. Redeploy — next/image will use edge-cached transforms for R2 originals."
