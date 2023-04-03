import { test, expect } from '@playwright/test';

test('Check WordPress homepage', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const pageTitle = await page.title();
  expect(pageTitle).toMatch('WordPress');
});
