import { expect, test } from '@playwright/test';

test('about page loads and its menu item is active', async ({ page }) => {
  await page.goto('/en/about');

  const header = page.getByRole('banner');
  await expect(header.locator('[aria-current="page"]')).toHaveText('About');
});
