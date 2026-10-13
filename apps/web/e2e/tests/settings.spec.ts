import { expect, test } from '@playwright/test';

import { getSettingsPage } from '../pages/SettingsPage';
import { setupE2eTestState } from '../utils/setup';
import { signalDismissDialog } from '../utils/ui';

test('settings page loads and its menu item is active', {
  tag: '@smoke',
}, async ({ page }) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();

  await expect(settingsPage.activeMenuItem).toHaveAccessibleName('Settings');
});

test('pain point flags can be toggled and persisted', async ({ page }) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();
  const toggleCount = await settingsPage.painPreferenceFlags.togglesAll.count();
  expect(toggleCount).toBeGreaterThan(0);

  await settingsPage.painPreferenceFlags.disableAllButton.click();

  await expect(settingsPage.painPreferenceFlags.togglesUnchecked).toHaveCount(
    toggleCount,
  );
  await expect(settingsPage.painPreferenceFlags.togglesChecked).toHaveCount(0);

  await settingsPage.painPreferenceFlags.enableAllButton.click();

  // Enabling all pain points will likely result in multiple dialogs opening
  // which can block selector visibility.
  signalDismissDialog(page);

  await expect(settingsPage.painPreferenceFlags.togglesUnchecked).toHaveCount(
    0,
  );
  await expect(settingsPage.painPreferenceFlags.togglesChecked).toHaveCount(
    toggleCount,
  );
});

test('setting row label toggles its control', async ({ page }) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();

  const toggle = settingsPage.painPreferenceFlags.searchDelay;
  await expect(toggle).toBeVisible();
  const wasChecked = await toggle.isChecked();

  await settingsPage.painPreferenceFlags.searchDelayLabel.click();

  await expect(toggle).toBeChecked({ checked: !wasChecked });
});
