import { expect, test } from '@playwright/test';

test(
  'privacy policy page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/privacy-policy');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText(
      'Privacy Policy',
    );
  },
);
