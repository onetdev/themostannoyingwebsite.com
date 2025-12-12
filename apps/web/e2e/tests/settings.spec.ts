import { expect, test } from '@playwright/test';

import { getSettingsPage } from '../pages/SettingsPage';
import { setupE2eTestState } from '../utils/setup';

test(
  'settings page loads and its menu item is active',
  { tag: '@smoke' },
  async ({ page }) => {
    await setupE2eTestState(page);
    const settingsPage = getSettingsPage(page);
    await settingsPage.goto();

    await expect(settingsPage.activeMenuItem).toHaveText('Settings');
  },
);

// TODO: Add tests for toggle changes, runtime variable increments
