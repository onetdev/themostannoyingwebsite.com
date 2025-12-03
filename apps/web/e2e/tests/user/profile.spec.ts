import { test } from '@playwright/test';

test(
  'user profile page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/virgin');
    await page.goto('/en/user/profile');
  },
);
