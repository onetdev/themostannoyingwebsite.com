import { expect, test } from '@playwright/test';

import { getDonatePage } from '../pages/DonatePage';
import { setupE2eTestState } from '../utils/setup';

test('donate page loads and its menu item is active', {
  tag: '@smoke',
}, async ({ page }) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.activeMenuItem).toHaveText('Donate');
});

test('donation page displays essential interactive elements', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  // Assert visibility of interactive elements/components
  await expect(donatePage.buyMeACoffeeButton).toBeVisible();
  await expect(donatePage.payPalButton).toBeVisible();
  await expect(donatePage.alternativeOptionsLink).toBeVisible();
  await expect(donatePage.jarAnimation).toBeVisible();
  await expect(donatePage.donationBalance).toBeVisible();
  await expect(donatePage.cryptoWalletList).toBeVisible();
});

test('donation page renders the made-up impact stats chart', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.impactStatsHeading).toBeVisible();
  await expect(donatePage.impactStatsChart).toBeVisible();
  await expect(page.getByText('Kebabs funded')).toBeVisible();
  await expect(page.getByText('Bugs shipped as features')).toBeVisible();
});
