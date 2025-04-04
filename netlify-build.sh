#!/bin/bash

# Print Node and npm versions for debugging
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Build the frontend
echo "Building frontend..."
npm run build

echo "Build completed successfully!"
