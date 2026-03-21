@echo off
REM Nordhessen Automobile - Quick Deployment Script for Windows

echo.
echo 🚗 Nordhessen Automobile - Deployment Script
echo ==============================================
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: Please run this script from the frontend directory
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Build the project
echo.
echo 🔨 Building project...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 📁 Your build is ready in the 'dist' folder
echo.
echo 🚀 Next steps:
echo    1. Go to https://app.netlify.com/drop
echo    2. Drag the 'dist' folder onto the page
echo    3. Your site will be live in seconds!
echo.
echo    OR use Netlify CLI:
echo    netlify deploy --prod --dir=dist
echo.
pause
