#!/bin/bash

# Nordhessen Automobile - Quick Deployment Script
echo "🚗 Nordhessen Automobile - Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the project
echo ""
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📁 Your build is ready in the 'dist' folder"
echo ""
echo "🚀 Next steps:"
echo "   1. Go to https://app.netlify.com/drop"
echo "   2. Drag the 'dist' folder onto the page"
echo "   3. Your site will be live in seconds!"
echo ""
echo "   OR use Netlify CLI:"
echo "   netlify deploy --prod --dir=dist"
echo ""
