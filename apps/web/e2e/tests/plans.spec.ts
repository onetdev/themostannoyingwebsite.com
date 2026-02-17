import { expect, test } from '@playwright/test';

import { getPlansPage } from '../pages/PlansPage';
import { setupE2eTestState } from '../utils/setup';

test.describe('Plans Page', () => {
  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);
  });

  test('should display correctly and handle billing cycle changes', async ({
    page,
  }) => {
    const plansPage = getPlansPage(page);
    await plansPage.goto();

    // Check heading
    await expect(plansPage.headline).toBeVisible();

    // Check urgency countdown exists
    await expect(plansPage.urgencyCountdown).toBeVisible();

    // Check plan cards are present
    const poorifiedCard = plansPage.getPlanCard('poorified');
    const sufficientCard = plansPage.getPlanCard('sufficient');
    const deluxCard = plansPage.getPlanCard('delux');

    await expect(poorifiedCard.card).toBeVisible();
    await expect(sufficientCard.card).toBeVisible();
    await expect(deluxCard.card).toBeVisible();

    // Verify default monthly billing
    await expect(poorifiedCard.originalPrice).toContainText('$99.00');
    await expect(poorifiedCard.chargeDisclaimer).toContainText(
      'You will be charged $79.20 today — billed monthly*',
    );

    // Switch to yearly billing
    await plansPage.billingCycleYearly.click();
    await expect(poorifiedCard.originalPrice).toContainText('$89.00');
    await expect(poorifiedCard.chargeDisclaimer).toContainText(
      'You will be charged $854.40 today — billed every year*',
    );
    await expect(poorifiedCard.chargeDisclaimer).toContainText(
      'billed every year',
    );

    // Switch to biyearly billing
    await plansPage.billingCycleBiyearly.click();
    await expect(poorifiedCard.originalPrice).toContainText('$67.00');
    await expect(poorifiedCard.chargeDisclaimer).toContainText(
      'You will be charged $1,286.40 today — billed every 2 years*',
    );
  });

  test('should apply urgency discount when countdown is active', async ({
    page,
  }) => {
    const plansPage = getPlansPage(page);
    await plansPage.goto();

    const poorifiedCard = plansPage.getPlanCard('poorified');

    // Check for discounted price
    await expect(poorifiedCard.discountedPrice).toBeVisible();
    // 99.00 * 0.8 = 79.20
    await expect(poorifiedCard.discountedPrice).toContainText('$79.20');
    await expect(poorifiedCard.originalPrice).toContainText('$99.00');

    // Check charge disclaimer with discount (99 * 0.8 = 79.20)
    await expect(poorifiedCard.chargeDisclaimer).toContainText(
      'You will be charged $79.20 today — billed monthly*',
    );
  });

  test('should allow selecting a plan', async ({ page }) => {
    const plansPage = getPlansPage(page);
    await plansPage.goto();

    const deluxCard = plansPage.getPlanCard('delux');

    // Initially not selected (should say "Select")
    await expect(deluxCard.selectButton).toHaveText('Select');

    // Select it
    await deluxCard.selectButton.click();

    // Now should say "Done"
    await expect(deluxCard.doneButton).toHaveText('Done');
  });
});
