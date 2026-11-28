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

test('possessed cursor applies and restores the custom cursor', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const settingsPage = getSettingsPage(page);
  await settingsPage.goto();

  const toggle = settingsPage.painPreferenceFlags.possessedCursor;
  await expect(toggle).not.toBeChecked();

  await toggle.click();

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-possessed-cursor', 'true');

  const cursor = await page.evaluate(
    () => getComputedStyle(document.body).cursor,
  );
  expect(cursor).toContain('/assets/cursors/');

  const toggleCursor = await toggle.evaluate(
    (element) => getComputedStyle(element).cursor,
  );
  expect(toggleCursor).not.toContain('/assets/cursors/');

  const linkCursor = await settingsPage.menuItem.home.evaluate(
    (element) => getComputedStyle(element).cursor,
  );
  expect(linkCursor).not.toContain('/assets/cursors/');

  const inputCursor = await page
    .getByRole('textbox')
    .first()
    .evaluate((element) => getComputedStyle(element).cursor);
  expect(inputCursor).not.toContain('/assets/cursors/');

  const sliderCursor = await page
    .getByRole('slider')
    .evaluate((element) => getComputedStyle(element).cursor);
  expect(sliderCursor).toBe('pointer');

  await toggle.click();

  await expect(html).not.toHaveAttribute('data-possessed-cursor');
});
