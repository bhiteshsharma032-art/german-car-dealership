@echo off
echo ========================================
echo   Car Dealership - Development Servers
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
echo.

echo [2/4] Starting Backend Server...
echo Opening new terminal for backend...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
echo.

echo [3/4] Starting Frontend Server...
echo Opening new terminal for frontend...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul
echo.

echo [4/4] Servers Starting...
echo.
echo ========================================
echo   Servers are starting in new windows
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open browser...
pause >nul

REM Wait a bit for servers to start
timeout /t 5 /nobreak >nul

REM Open browser
start http://localhost:5173

echo.
echo Browser opened!
echo.
echo To stop servers: Close the terminal windows
echo or press Ctrl+C in each terminal
echo.
pause
