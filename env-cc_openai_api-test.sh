#!/bin/bash

# OpenAI API Environment Variables Setup Script
# Get OpenAI API Key from: https://platform.openai.com/settings/organization/api-keys
# This script sets up the core environment variables for the official OpenAI API

# --- CONFIGURATION ---
# Set your values here

# 1. Get your API key from: https://platform.openai.com/api-keys
export OPENAI_API_KEY="sk-proj-q..." # IMPORTANT: Replace with your actual OpenAI API key

# 2. This is the official OpenAI API endpoint.
export OPENAI_API_BASE="https://api.openai.com/v1"

# 3. Primary Model: State-of-the-art model, great for complex tasks.
export OPENAI_MODEL="GPT-5-mini"

# 4. Small/Fast Model: A highly capable and cost-effective model, aligning with your
#    request for a "mini" version.
export OPENAI_SMALL_FAST_MODEL="GPT-5-mini"


# --- END CONFIGURATION ---

echo "✅ OpenAI environment variables set for the current session."
echo "   - Model: $OPENAI_MODEL"
echo "   - Mini Model: $OPENAI_SMALL_FAST_MODEL"