import smtplib

def send_email(subject, body, from_email, to_email, mail_server="localhost", mail_port=1025):
    message = f"Subject: {subject}\n\n{body}"
    with smtplib.SMTP(mail_server, mail_port) as server:
        server.sendmail(from_email, to_email, message)