import { expect, test } from '@playwright/test';

test(
  'settings page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/settings');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText(
      'Settings',
    );
  },
);

// TODO: Add tests for toggle changes, runtime variable increments
