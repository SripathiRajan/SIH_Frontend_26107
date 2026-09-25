@echo off
title Praman Expo Web Server
cd /d %~dp0
if not exist node_modules (
    echo First-time setup: installing dependencies...
    call npm install
)
echo Starting Expo web...
call npx expo start --web
pause
