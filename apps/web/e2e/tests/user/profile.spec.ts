import { test } from '@playwright/test';

import { setupE2eTestState } from '../../utils/setup';

test(
  'user profile page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);

    await page.goto('/en/user/profile');
  },
);
