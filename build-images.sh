#!/bin/bash

# Name of the Docker images
FRONTEND_IMAGE_NAME="frontend"
BACKEND_IMAGE_NAME="backend"

# Navigate to the frontend directory and build the Docker image
echo "Building the frontend Docker image..."
docker build -t $FRONTEND_IMAGE_NAME ./frontend
if [ $? -ne 0 ]; then
  echo "Error building frontend Docker image!"
  exit 1
fi
echo "Frontend Docker image built successfully."

# Navigate to the backend directory and build the Docker image
echo "Building the backend Docker image..."
docker build -t $BACKEND_IMAGE_NAME ./backend
if [ $? -ne 0 ]; then
  echo "Error building backend Docker image!"
  exit 1
fi
echo "Backend Docker image built successfully."

# Optionally, display a message
echo "Both Docker images have been built successfully."
