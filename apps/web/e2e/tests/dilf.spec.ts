import { expect, test } from '@playwright/test';

import { getDilfPage } from '../pages/DilfPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'dilf page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const dilfPage = getDilfPage(page);
    await dilfPage.goto();

    await expect(dilfPage.activeMenuItem).toHaveText('DILF');
  },
);

// TODO: Add test for clicking on a donut anywhere
