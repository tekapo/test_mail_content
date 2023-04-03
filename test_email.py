# test_email.py
import json


def test_email_subject():
    with open("email.json", "r") as file:
        email_data = json.load(file)

    expected_subject = "Test email from WordPress"
    assert email_data["subject"] == expected_subject, f"Expected subject: '{expected_subject}', but got: '{email_data['subject']}'"


def test_email_recipient():
    with open("email.json", "r") as file:
        email_data = json.load(file)

    expected_recipient = "recipient@example.com"
    assert email_data["to"] == expected_recipient, f"Expected recipient: '{expected_recipient}', but got: '{email_data['to']}'"
