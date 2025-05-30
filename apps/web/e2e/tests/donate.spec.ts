import { expect, test } from '@playwright/test';

test(
  'donate page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/donate');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Donate');
  },
);
