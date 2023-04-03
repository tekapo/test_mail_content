<?php
// send-email.php

require_once('wordpress/wp-load.php');

$to = 'recipient@example.com';
$subject = 'Test Email';
$message = 'This is a test email sent from WordPress on GitHub Actions.';
$headers = 'From: sender@example.com' . "\r\n";

if (wp_mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully';
} else {
    echo 'An error occurred while sending the email';
}
