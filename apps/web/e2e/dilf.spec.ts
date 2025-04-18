import { expect, test } from '@playwright/test';

test('dilf page loads and its menu item is active', async ({ page }) => {
  await page.goto('/en/dilf');

  const header = page.getByRole('banner');
  await expect(header.locator('[aria-current="page"]')).toHaveText('DILF');

  // TODO: Add test for clicking on a donut anywhere
});
