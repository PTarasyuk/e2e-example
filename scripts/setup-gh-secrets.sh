#!/bin/bash

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "📥 Install it using:"
    echo "   brew install gh"
    exit 1
fi

# Check if gh is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ GitHub CLI authentication required"
    echo "🔑 Run:"
    echo "   gh auth login"
    exit 1
fi

# Check if .env.ci file exists
if [ ! -f .env.ci ]; then
    echo "❌ .env.ci file not found"
    exit 1
fi

echo "🔄 Processing secrets from .env.ci file..."

# Read .env.ci file and update each variable as a secret
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z "${key}" ]] && continue
    
    # Remove extra spaces
    key=$(echo $key | xargs)
    value=$(echo $value | xargs)
    
    if [ ! -z "$key" ] && [ ! -z "$value" ]; then
        # Always update the secret
        if gh secret list | grep -q "^$key"; then
            echo "🔄 Updating existing secret: $key"
        else
            echo "➕ Adding new secret: $key"
        fi

        # Set or update the secret
        gh secret set "$key" --body "$value"
        
        if [ $? -eq 0 ]; then
            echo "✅ Secret $key processed successfully"
        else
            echo "❌ Error processing secret $key"
            exit 1
        fi
    fi
done < .env.ci

echo "✨ All secrets have been processed successfully!"

# Display list of current secrets
echo "📋 Current secrets list:"
gh secret list