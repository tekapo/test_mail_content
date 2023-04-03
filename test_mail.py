# test_mail.py

import requests

import mail


def test_send_email():
    subject = "Test Email"
    body = "This is a test email sent using MailHog and pytest."
    from_email = "sender@example.com"
    to_email = "recipient@example.com"

    # Send email
    mail.send_email(subject, body, from_email, to_email)

    # Verify the email using MailHog API
    mailhog_api = "http://localhost:8025/api/v2/messages"
    response = requests.get(mailhog_api)
    messages = response.json()

    assert len(messages["items"]) == 1
    msg = messages["items"][0]

    assert msg["From"]["Mailbox"] == "sender"
    assert msg["From"]["Domain"] == "example.com"
    assert msg["To"][0]["Mailbox"] == "recipient"
    assert msg["To"][0]["Domain"] == "example.com"
    assert msg["Content"]["Headers"]["Subject"][0] == subject
    assert msg["Content"]["Body"] == body
