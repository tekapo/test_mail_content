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

  // Go to the WordPress registration page
  await page.goto('http://localhost:8080/wp-login.php?action=register');

  // Fill out the registration form
  await page.fill('#user_login', 'testuser');
  await page.fill('#user_email', 'testuser@example.com');
  await page.click('#wp-submit');


  // Check for successful registration
  const registrationSuccess = await page.waitForSelector('#login p.message');
  expect(await registrationSuccess.textContent()).toContain('Registration complete. Please check your email');

  // Take a screenshot of the registration success message
  await page.screenshot({ path: 'registration_success.png' });

  // Give MailHog some time to capture the email
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Fetch the captured emails from MailHog API
  const response = await fetch('http://localhost:8025/api/v2/messages');
  const data = await response.json();

  // Find the email sent to the test user
  const email = data.items.find((item: any) => item.To[0].Mailbox === 'testuser' && item.To[0].Domain === 'example.com');

  // Test the email content
  expect(email.Content.Headers.Subject[0]).toBe('Your New WordPress Site');
  expect(email.Content.Headers['X-Mailer'][0]).toBe('PHPMailer 6.1.6 (https://github.com/PHPMailer/PHPMailer)');

});
