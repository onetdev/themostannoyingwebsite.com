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
  await expect(donatePage.donationBalance).toBeVisible();
  await expect(donatePage.faqAccountQuestion).toBeVisible();
  await expect(donatePage.faqSoulQuestion).toBeVisible();
  await expect(donatePage.cryptoWalletBtc).toBeVisible();
  await expect(donatePage.cryptoWalletEth).toBeVisible();
});

test('crypto donation reveals its QR code in a popover', async ({ page }) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.cryptoQr).toBeHidden();

  await donatePage.bitcoinButton.click();
  await expect(donatePage.cryptoQr).toBeVisible();
  await expect(page.getByText(/≈ .* BTC/)).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(donatePage.cryptoQr).toBeHidden();

  await donatePage.ethereumButton.click();
  await expect(donatePage.cryptoQr).toBeVisible();
});

test('donation hero and tier picker are interactive', async ({ page }) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.heroHeadline).toBeVisible();
  await expect(donatePage.heroStatusPulse).toBeVisible();
  await expect(donatePage.shareCta).toBeVisible();
  await expect(donatePage.impactCta).toBeVisible();
  await expect(donatePage.tiersHeading).toBeVisible();

  // The primary CTA is only shown when the support options sit below the hero
  // (mobile). At the desktop viewport they are beside it, so it is hidden.
  await expect(donatePage.primaryCta).toBeHidden();
  await page.setViewportSize({ width: 480, height: 900 });
  await expect(donatePage.primaryCta).toBeVisible();

  await donatePage.tierHosting.click();
  await expect(donatePage.tierHosting).toHaveAttribute('aria-pressed', 'true');

  await donatePage.tierCustom.click();
  await expect(donatePage.customAmountInput).toBeVisible();
  await donatePage.customAmountInput.fill('42');
  await expect(donatePage.customAmountInput).toHaveValue('42');
});

test('before/after block is framed by separators', async ({ page }) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.beforeAfterSlider).toBeVisible();
  await expect(donatePage.beforeAfterSeparator).toHaveCount(2);
  await expect(donatePage.beforeAfterSeparator.first()).toBeVisible();
});

test('donation page renders the made-up impact stats chart', async ({
  page,
}) => {
  await setupE2eTestState(page);
  const donatePage = getDonatePage(page);
  await donatePage.goto();

  await expect(donatePage.impactStatsHeading).toBeVisible();
  await expect(donatePage.impactStatsGroup).toBeVisible();
  await expect(donatePage.impactStatsMonthlyChart).toBeVisible();
  await expect(donatePage.impactStatsSeparator).toHaveCount(2);
  await expect(donatePage.impactStatsSeparator.first()).toBeVisible();
  await expect(donatePage.impactStatCoffeesConsumed).toBeVisible();
  await expect(page.getByText('Coffees consumed')).toBeVisible();
  await expect(donatePage.impactStatTechnicalDebtInterest).toBeVisible();
  await expect(page.getByText('Technical debt interest')).toBeVisible();
  await expect(donatePage.impactStatMonthlyVisitors).toBeVisible();
  await expect(page.getByText('Monthly visitors')).toBeVisible();
  await expect(donatePage.impactStatCaptchasCompleted).toBeVisible();
  await expect(page.getByText('Captchas completed')).toBeVisible();
  await expect(donatePage.kidneySupporter).toBeVisible();
  await expect(donatePage.impactSupportersDescription).toHaveText(
    'All 3 of our supporters are fictional organs. Join them and claim your own medal.',
  );
});
