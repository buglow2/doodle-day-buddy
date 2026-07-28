@echo off
setlocal EnableDelayedExpansion

set PORT=8080
set VERSION=v90

echo.
echo  ====================================
echo   MomentPlan  [ %VERSION% ]
echo  ====================================
echo.

:: Kill process on port 8080
echo  [1/3] Stopping existing server...
set KILLED=0
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":%PORT% "') do (
    if not "%%a"=="0" (
        taskkill /PID %%a /F >nul 2>&1
        if !ERRORLEVEL! EQU 0 set KILLED=1
    )
)
if !KILLED! EQU 1 (
    echo   Stopped. Waiting 1 second...
    timeout /t 1 /nobreak >nul
) else (
    echo   No existing server found.
)

:: Start server
echo.
echo  [2/3] Starting server...

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo   Using Python
    start "MomentPlan" /MIN python "%~dp0server.py" %PORT%
    goto :wait
)

python3 --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo   Using Python3
    start "MomentPlan" /MIN python3 "%~dp0server.py" %PORT%
    goto :wait
)

node --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo   Using Node.js
    start "MomentPlan" /MIN node "%~dp0server.js" %PORT%
    goto :wait
)

echo   Using PowerShell
start "MomentPlan" /MIN powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port %PORT%

:wait
timeout /t 2 /nobreak >nul

:: Open browser
echo  [3/3] Opening browser...
start http://localhost:%PORT%

echo.
echo  ====================================
echo   App : http://localhost:%PORT%
echo   Ver : %VERSION%
echo  ====================================
echo.
echo   To stop: close the "MomentPlan" window
echo   To update: overwrite files then re-run this bat
echo.
pause
