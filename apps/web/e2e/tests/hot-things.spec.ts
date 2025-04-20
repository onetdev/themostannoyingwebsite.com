import { expect, test } from '@playwright/test';

test(
  'hot things page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await page.goto('/en/hot-things');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText(
      'Hot things',
    );
  },
);

// TODO: Add test for checking trying to play the video and going through permission request flow
