# Doodle Day Buddy - PowerShell no-cache server
param([int]$Port = 8080)

$DistPath = Join-Path $PSScriptRoot "dist"
$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://*:$Port/")

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "application/javascript"
    ".css"  = "text/css"
    ".json" = "application/json"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".png"  = "image/png"
}

try { $Listener.Start() } catch {
    Write-Host "Port $Port failed: $_"
    exit 1
}

$localIP = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.InterfaceAlias -notmatch "Loopback" } |
    Select-Object -First 1).IPAddress

Write-Host "Server running:"
Write-Host "  http://localhost:$Port"
if ($localIP) { Write-Host "  http://${localIP}:$Port  (LAN)" }

while ($Listener.IsListening) {
    try {
        $ctx = $Listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response

        $res.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        $res.Headers.Add("Pragma", "no-cache")
        $res.Headers.Add("Expires", "0")

        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        $filePath = Join-Path $DistPath $urlPath.TrimStart("/")

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $res.ContentType = if ($mime[$ext]) { $mime[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.Close()
    } catch { }
}
