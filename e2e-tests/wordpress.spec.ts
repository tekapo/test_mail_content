import { test, expect } from '@playwright/test';
import fetch from 'node-fetch';

test('Enable registration, register a new user, and test email content', async ({ page }) => {
  // Login to WordPress admin
  await page.goto('http://localhost:8080/wp-login.php');
  await page.fill('#user_login', 'admin');
  await page.fill('#user_pass', 'admin_password');
  await page.click('#wp-submit');

  // Go to the General Settings page
  await page.goto('http://localhost:8080/wp-admin/options-general.php');

  // Enable user registration
  await page.check('#users_can_register');

  // Save the settings
  await page.click('#submit');

  // Logout from the admin account
  await page.goto('http://localhost:8080/wp-login.php?action=logout');
  await page.click('a[href="http://localhost:8080/wp-login.php?action=logout&_wpnonce=a3b3c3d3e3"]');


  // Give MailHog some time to capture the email
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Fetch the captured emails from MailHog API
  const response = await fetch('http://localhost:8025/api/v2/messages');
  const data = await response.json();
  
  // Assuming there's only one email captured by MailHog
  const email = data.items[0];

  // Test the email subject
  expect(email.Content.Headers.Subject[0]).toBe('Expected Subject');

  // Test the email recipient
  expect(email.Content.Headers.To[0]).toBe('recipient@example.com');

  // Test the email body content
  const emailBody = email.Content.Body;
  expect(emailBody).toContain('Expected content in email body');
});
