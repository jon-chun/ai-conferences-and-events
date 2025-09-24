curl -v https://api.openai.com/v1/chat/completions \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5-mini",
    "messages": [
      {
        "role": "system",
        "content": "You are a concise AI assistant."
      },
      {
        "role": "user",
        "content": "What is the key theoretical advancement that distinguishes you from the GPT-4 architecture? Respond in one sentence."
      }
    ]
  }'