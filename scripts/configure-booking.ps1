param([Parameter(Mandatory=$true)][string]$BookingUrl)
$ErrorActionPreference = 'Stop'
$bookingUri = [Uri]$BookingUrl
if ($bookingUri.Scheme -ne 'https' -or $bookingUri.UserInfo -ne '' -or $bookingUri.Host -notin @('cal.com','www.cal.com') -or $bookingUri.AbsolutePath.Trim('/').Split('/').Count -lt 2) {
    throw 'Use the verified public HTTPS Cal.com event URL (username/event), without credentials.'
}
Write-Host 'Checking the public event URL. Confirm it belongs to Nayana before using this script.'
$response = Invoke-WebRequest -Uri $bookingUri -MaximumRedirection 3
if ($response.StatusCode -ne 200) { throw 'The booking page did not return HTTP 200.' }
$bookingConfigPath = Join-Path $PSScriptRoot '../dist/config.js'
$bookingConfigText = Get-Content -LiteralPath $bookingConfigPath -Raw
$bookingJsonUrl = ConvertTo-Json $bookingUri.AbsoluteUri -Compress
$bookingConfigText = $bookingConfigText -replace "bookingUrl: '[^']*'", "bookingUrl: $bookingJsonUrl"
$bookingConfigText = $bookingConfigText -replace 'bookingEnabled: false', 'bookingEnabled: true'
Set-Content -LiteralPath $bookingConfigPath -Value $bookingConfigText -Encoding utf8
Write-Host 'Public integration configured locally. Test availability, confirmations and cancellations before publishing. HTTP 200 alone is not an end-to-end booking test.'
