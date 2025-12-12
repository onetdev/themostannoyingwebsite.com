import { test } from '@playwright/test';

import { getProfilePage } from '../../pages/user/ProfilePage';
import { setupE2eTestState } from '../../utils/setup';

test(
  'user profile page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const profilePage = getProfilePage(page);
    await profilePage.goto();
  },
);
