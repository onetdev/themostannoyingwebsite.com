import { expect, test } from '@playwright/test';

import { getAboutPage } from '../pages/AboutPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'about page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const aboutPage = getAboutPage(page);
    await aboutPage.goto();

    await expect(aboutPage.activeMenuItem).toHaveText('About');
  },
);
