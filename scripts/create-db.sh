#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -f "$PROJECT_ROOT/.env" ]; then
    set -a
    source "$PROJECT_ROOT/.env"
    set +a
    echo "✅ Loaded environment variables from .env"
else
    echo "❌ Error: .env file not found in $PROJECT_ROOT"
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "🔍 Please start Docker Desktop and try again"
    exit 1
fi

echo "🐳 Building Pagila Docker image..."
cd pagila
docker build -t pagila-db .
cd ..

echo "🚀 Starting Pagila container..."
docker stop pagila 2>/dev/null || true
docker rm pagila 2>/dev/null || true
docker run -d \
  --name pagila \
  -e POSTGRES_USER=${PG_USER} \
  -e POSTGRES_PASSWORD=${PG_PASSWORD} \
  -e POSTGRES_DB=${PG_DATABASE} \
  -p ${PG_PORT}:5432 \
  pagila-db

echo "⏳ Waiting for database to be ready..."
sleep 5

echo "✅ Pagila database is ready!"