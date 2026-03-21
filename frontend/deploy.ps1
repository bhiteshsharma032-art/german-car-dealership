# AutoHaus Premium - Netlify Deployment Script
# Run this script to deploy to Netlify

Write-Host "🚗 AutoHaus Premium - Netlify Deployment" -ForegroundColor Blue
Write-Host "=========================================" -ForegroundColor Blue
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Build output is in: dist/" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Ready to deploy! Choose one option:" -ForegroundColor Green
Write-Host ""
Write-Host "Option 1: Deploy with Netlify CLI" -ForegroundColor White
Write-Host "  npx netlify-cli deploy --prod" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Drag & Drop" -ForegroundColor White
Write-Host "  1. Go to https://app.netlify.com/drop" -ForegroundColor Gray
Write-Host "  2. Drag the 'dist' folder" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 3: Connect Git Repository" -ForegroundColor White
Write-Host "  1. Push to GitHub/GitLab" -ForegroundColor Gray
Write-Host "  2. Connect on Netlify dashboard" -ForegroundColor Gray
Write-Host ""
Write-Host "🎨 Theme: Pure Blue & White" -ForegroundColor Blue
Write-Host "🤖 ChatBot: Integrated with n8n webhook" -ForegroundColor Blue
Write-Host "📱 Responsive: Mobile, Tablet, Desktop" -ForegroundColor Blue
Write-Host ""
