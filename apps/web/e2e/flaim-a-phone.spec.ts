import { test } from '@playwright/test';

test('flaim a phone page loads', async ({ page }) => {
  await page.goto('/en/flaim-a-phone');

  // TODO: Add test for testing the quiz
});
