# test_email.py
import json

import requests


def test_email_subject():
    resp = requests.get("http://localhost:8025/api/v2/messages")
    email_data = json.loads(resp.content)

    latest_email = email_data["items"][0]
    email_subject = latest_email["Content"]["Headers"]["Subject"][0]
    print(email_subject)

    expected_subject = "Test email from WordPress"
    assert (
        email_subject == expected_subject
    ), f"Expected subject: '{expected_subject}', but got: '{email_subject}'"


# def test_email_recipient():
#     with open("email.json", "r") as file:
#         email_data = json.load(file)

#     expected_recipient = "recipient@example.com"
#     assert (
#         email_data["to"] == expected_recipient
#     ), f"Expected recipient: '{expected_recipient}', but got: '{email_data['to']}'"
