import { expect, test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

test(
  'dilf page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    await page.goto('/en/dilf');

    const header = page.getByRole('banner');
    await expect(header.locator('[aria-current="page"]')).toHaveText('DILF');
  },
);

// TODO: Add test for clicking on a donut anywhere
