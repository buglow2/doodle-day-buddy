@echo off
title MomentPlan - Build Installer
echo.
echo  ============================================
echo   MomentPlan - Build Installer (exe)
echo   First run takes 5-10 min (downloads tools)
echo  ============================================
echo.
cd /d "%~dp0"
echo  [1/3] Copying latest app files...
if exist dist rmdir /s /q dist
xcopy /e /i /q "..\dist" "dist" >nul
if errorlevel 1 ( echo   ERROR: ..\dist folder not found. & pause & exit /b 1 )
echo  [2/3] Installing build tools (first time only, please wait)...
call npm install --no-audit --no-fund
if errorlevel 1 ( echo   ERROR: npm install failed. Check internet. & pause & exit /b 1 )
echo  [3/3] Building installer exe...
call npx electron-builder --win
if errorlevel 1 ( echo   ERROR: build failed. & pause & exit /b 1 )
echo.
echo  ============================================
echo   DONE! Installer is in the "release" folder.
echo  ============================================
start "" "%~dp0release"
pause
