import { expect, test } from '@playwright/test';

import { getDonatePage } from '../pages/DonatePage';
import { setupE2eTestState } from '../utils/setup';

test(
  'donate page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const donatePage = getDonatePage(page);
    await donatePage.goto();

    await expect(donatePage.activeMenuItem).toHaveText('Donate');
  },
);
