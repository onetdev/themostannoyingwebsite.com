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

test('experience flags can be toggled and persisted', async ({ page }) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();
  const checkboxCount =
    await settingsPage.experienceFlags.checkboxesAll.count();

  await settingsPage.experienceFlags.disableAllButton.click();

  await expect(settingsPage.experienceFlags.checkboxesUnchecked).toHaveCount(
    checkboxCount,
  );
  await expect(settingsPage.experienceFlags.checkboxesChecked).toHaveCount(0);

  await settingsPage.experienceFlags.enableAllButton.click();

  await expect(settingsPage.experienceFlags.checkboxesUnchecked).toHaveCount(0);
  await expect(settingsPage.experienceFlags.checkboxesChecked).toHaveCount(
    checkboxCount,
  );
});
