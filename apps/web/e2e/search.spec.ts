import { test } from '@playwright/test';

test('search page loads', async ({ page }) => {
  await page.goto('/en/search');

  // TODO: Add test from coming from the menu and also perfoming actual search
});
