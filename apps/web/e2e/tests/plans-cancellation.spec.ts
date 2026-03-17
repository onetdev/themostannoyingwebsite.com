import { expect, test } from '@playwright/test';
import { getCancellationPage } from '../pages/CancellationPage';
import { setupE2eTestState } from '../utils/setup';

test.describe('Plan Cancellation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await setupE2eTestState(page);
  });

  test('should complete the full cancellation flow', async ({ page }) => {
    const cancellationPage = getCancellationPage(page);
    await cancellationPage.goto();

    // Step 1: Reasons
    await expect(cancellationPage.reasonsTitle).toBeVisible();
    await cancellationPage.selectReason(0);

    // Step 2: Essay
    await expect(cancellationPage.essayTitle).toBeVisible();
    await cancellationPage.fillEssay(
      'I am writing this essay because I have to. It is very long and detailed. I hope you enjoy reading it. '.repeat(
        40,
      ),
    ); // Ensure it's long enough though the validation might not be strictly 3000 chars in the UI component itself (it just shows a counter)
    await cancellationPage.essayNextButton.click();

    // Step 3: Valdo (Unsubscribe buttons)
    await expect(cancellationPage.valdoTitle).toBeVisible();
    await cancellationPage.clickValdoCorrectButton();

    // Step 4: Upsell
    await expect(cancellationPage.upsellTitle).toBeVisible();
    await cancellationPage.upsellNextButton.click();

    // Step 5: Email
    await expect(cancellationPage.emailTitle).toBeVisible();
    await cancellationPage.fillEmail('test@example.com');
    await cancellationPage.emailNextButton.click();

    // Step 6: Confirmation
    await expect(cancellationPage.confirmationTitle).toBeVisible();
    await expect(cancellationPage.printButton).toBeVisible();
  });

  test('should allow aborting the cancellation at the Essay step', async ({
    page,
  }) => {
    const cancellationPage = getCancellationPage(page);
    await cancellationPage.goto();

    // Move to Essay step
    await cancellationPage.selectReason(0);

    // Abort
    await cancellationPage.essayAbortButton.click();

    // Should be back to Home (or at least not on cancellation page)
    await expect(page).toHaveURL(/\/en\/?$/);
  });

  test('should allow taking the special deal at the Upsell step', async ({
    page,
  }) => {
    const cancellationPage = getCancellationPage(page);
    await cancellationPage.goto();

    // Step 1: Reasons
    await expect(cancellationPage.reasonsTitle).toBeVisible();
    await cancellationPage.selectReason(0);

    // Step 2: Essay
    await cancellationPage.fillEssay('Slightly longer essay'.repeat(300));
    await cancellationPage.essayNextButton.click();

    // Step 3: Valdo (Unsubscribe buttons)
    await expect(cancellationPage.valdoTitle).toBeVisible();
    await cancellationPage.clickValdoCorrectButton();

    // Step 4: Upsell
    await expect(cancellationPage.upsellTitle).toBeVisible();
    await cancellationPage.upsellSpecialDealButton.click();

    // Should be on special deal page
    await expect(page).toHaveURL(/\/en\/plans\/special-deal\/$/);
  });
});
