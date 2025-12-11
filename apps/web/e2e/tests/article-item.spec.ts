import { expect, test } from '@playwright/test';

import { setupE2eTestState } from '../utils/setup';

test(
  'article can be view from the home page',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    await page.goto('/');

    await page.getByTestId('cover-article').locator('a').click();

    await expect(page).toHaveURL(/\/en\/articles\/.*/, { timeout: 2000 });

    await page.getByTestId('article-item').isVisible();
    await page.getByTestId('article-item-content').isVisible();
    await page.getByTestId('paywall-overlay-confirm').isVisible();
    await page.getByTestId('paywall-overlay-cancel').isVisible();
  },
);
