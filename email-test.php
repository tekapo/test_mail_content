<?php
/**
 * Plugin Name: Email Test
 */

function email_test_send_email() {
    $to = 'recipient@example.com';
    $subject = 'Test email from WordPress';
    $message = 'This is a test email sent from a WordPress plugin.';

    wp_mail($to, $subject, $message);
}
add_action('init', 'email_test_send_email');