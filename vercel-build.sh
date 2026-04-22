#!/bin/bash
set -e
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Building frontend..."
npm run build -w frontend
echo "Build complete!"
