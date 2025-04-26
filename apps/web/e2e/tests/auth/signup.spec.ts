import { expect, test } from '@playwright/test';

test(
  'signup page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/user/signup');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('Login');
  },
);
