import { expect, test } from '@playwright/test';

import { getContactPage } from '../pages/ContactPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'contact page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const contactPage = getContactPage(page);
    await contactPage.goto();

    await expect(contactPage.activeMenuItem).toHaveText('Contact');
  },
);
