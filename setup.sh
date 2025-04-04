#!/bin/bash

# Setup script for AI Resource Library project

echo "🚀 Setting up AI Resource Library project..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed or not in PATH. Please install Node.js and npm first."
    exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete! You can now run the project with:"
echo "   npm run dev"
