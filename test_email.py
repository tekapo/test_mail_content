import requests


def test_email_subject_and_body():
    # Get the captured emails from MailHog
    response = requests.get("http://localhost:8025/api/v2/messages")
    response_data = response.json()

    # Check that there is at least one email
    assert len(response_data["items"]) > 0

    # Get the email subject and body
    email = response_data["items"][0]
    email_subject = email["Content"]["Headers"]["Subject"][0]
    email_body = email["Content"]["Body"]

    # Check the email subject and body
    assert email_subject == "Expected Subject"
    assert "Expected content" in email_body
