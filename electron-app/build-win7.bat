@echo off
title MomentPlan - Windows 7 Installer Build
echo.
echo  ==================================================
echo   MomentPlan - Windows 7 installer (.exe)
echo   32-bit build = runs on 32-bit AND 64-bit Win7
echo   First run takes 5-10 min (downloads Electron 22)
echo  ==================================================
echo.
cd /d "%~dp0"

echo  [1/5] Copying latest app files...
if exist dist rmdir /s /q dist
xcopy /e /i /q "..\dist" "dist" >nul
if errorlevel 1 ( echo   ERROR: ..\dist folder not found. & pause & exit /b 1 )

echo  [2/5] Installing build tools (first time only)...
call npm install --no-audit --no-fund
if errorlevel 1 ( echo   ERROR: npm install failed. Check internet. & pause & exit /b 1 )

echo  [3/5] Switching to Windows 7 compatible Electron 22...
call npm install --save-dev electron@22.3.27 --no-audit --no-fund
if errorlevel 1 ( echo   ERROR: electron 22 install failed. & pause & exit /b 1 )

echo  [4/5] Building 32-bit Windows 7 installer...
call npx electron-builder --win nsis --ia32 --publish never
if errorlevel 1 ( echo   ERROR: build failed. & goto restore )

echo  [5/5] Restoring Electron 31 (for normal Win10/11 builds)...
:restore
call npm install --save-dev electron@^31.0.0 --no-audit --no-fund

echo.
echo  ==================================================
echo   DONE! The Windows 7 installer is in "release".
echo   File name ends with ...ia32.exe  (give this to
echo   Windows 7 users).
echo  ==================================================
start "" "%~dp0release"
pause
