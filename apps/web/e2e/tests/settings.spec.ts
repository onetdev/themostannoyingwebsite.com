import { expect, test } from '@playwright/test';

import { getSettingsPage } from '../pages/SettingsPage';
import { setupE2eTestState } from '../utils/setup';
import { signalDismissDialog } from '../utils/ui';

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

test('pain point flags can be toggled and persisted', async ({ page }) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();
  const checkboxCount =
    await settingsPage.painPreferenceFlags.checkboxesAll.count();

  await settingsPage.painPreferenceFlags.disableAllButton.click();

  await expect(
    settingsPage.painPreferenceFlags.checkboxesUnchecked,
  ).toHaveCount(checkboxCount);
  await expect(settingsPage.painPreferenceFlags.checkboxesChecked).toHaveCount(
    0,
  );

  await settingsPage.painPreferenceFlags.enableAllButton.click();

  // Enabling all pain points will likely result in multiple dialogs opening
  // which can block selector visibility.
  signalDismissDialog(page);

  await expect(
    settingsPage.painPreferenceFlags.checkboxesUnchecked,
  ).toHaveCount(0);
  await expect(settingsPage.painPreferenceFlags.checkboxesChecked).toHaveCount(
    checkboxCount,
  );
});
