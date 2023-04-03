# mailhog_logs.py

import json

import requests

MAILHOG_API = "http://localhost:8025/api/v2/messages"

response = requests.get(MAILHOG_API)
messages = response.json()

# Just print messages
print(messages)

for msg in messages["items"]:
    print("===================================")
    print(f"From: {msg['From']}")
    print(f"To: {msg['To']}")
    print(f"Subject: {msg['Content']['Headers']['Subject'][0]}")
    print("Body:")
    print(msg["Content"]["Body"])
    print("===================================\n")
