#!/bin/bash

echo "🛑 Stopping Pagila container..."
docker stop pagila

echo "🗑️ Removing Pagila container..."
docker rm pagila

echo "✅ Cleanup completed!"