@echo off
title Praman Expo Installer and Runner
echo ====================================================
echo   PRAMAN EXPO: Installing dependencies & starting
echo ====================================================
echo.
cd /d %~dp0
echo [1/2] Installing Expo dependencies (this takes ~1 minute on first run)...
call npm install
echo.
echo [2/2] Launching Expo Web Server...
call npx expo start --web
pause
