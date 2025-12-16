import { expect, test } from '@playwright/test';

import { getPrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'privacy policy page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const privacyPolicyPage = getPrivacyPolicyPage(page);
    await privacyPolicyPage.goto();

    await expect(privacyPolicyPage.activeMenuItem).toHaveText('Privacy Policy');
  },
);
