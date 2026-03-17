import type { Page } from '@playwright/test';
import { getSharedLocators } from './shared/Shared';

export const getCancellationPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Subscription cancellation' }),

    // Reasons Step
    reasonsTitle: page.getByRole('heading', { name: 'Reason' }),
    reasonButtons: page.locator('button.w-full.justify-start'),

    // Essay Step
    essayTitle: page.getByRole('heading', { name: 'Exit Interview Essay' }),
    essayTextarea: page.locator('textarea[name="feedback"]'),
    essayCharacterCount: page.locator(
      'span.text-destructive, span.text-success',
    ),
    essayNextButton: page.getByRole('button', {
      name: 'I have completed my mandatory essay',
    }),
    essayAbortButton: page.getByRole('button', { name: 'Cancel cancellation' }),

    // Valdo Step
    valdoTitle: page.getByRole('heading', { name: 'Step 3: Lead by light' }),
    valdoButtons: page.getByRole('button', { name: 'Unsubscribe' }),
    valdoCorrectButton: page
      .locator('button:has-text("Unsubscribe")')
      .nth(1 * 9 + Math.floor(9 / 2)), // 1-4 index based on 10x9 grid

    // Upsell Step
    upsellTitle: page.getByRole('heading', {
      name: "Wait! Don't go! Give us one more chance please!",
    }),
    upsellSpecialDealButton: page.getByRole('button', {
      name: 'I want the special deal',
    }),
    upsellStayButton: page.getByRole('button', {
      name: 'Yes, I want to not leave',
    }),
    upsellNextButton: page.getByRole('button', {
      name: "Despite everything, I'm still aiming to cancel my subscription. I am the problem, not you.",
    }),

    // Email Step
    emailTitle: page.getByRole('heading', { name: 'Who are you?' }),
    emailInput: page.getByPlaceholder(
      'loyal-customer@themostannoyingwebsite.com',
    ),
    emailNextButton: page.getByRole('button', {
      name: "I'm sure, let's continue cancellation",
    }),
    emailDiscountButton: page.getByRole('button', {
      name: 'You know what, I changed my mind, I want the discount!',
    }),

    // Confirmation Step
    confirmationTitle: page.getByRole('heading', {
      name: 'FINAL VERIFICATION REQUIRED',
    }),
    printButton: page.getByRole('button', {
      name: '🖨️ PRINT FOR VERIFICATION 🖨️',
    }),
    keepSubscriptionButton: page.getByRole('button', {
      name: 'Keep My Subscription',
    }),
    upgradeButton: page.getByRole('button', { name: 'Upgrade Now' }),
    specialDealButton: page.getByRole('button', {
      name: 'Get the special deal',
    }),

    goto: async () => {
      await page.goto('/en/plans/cancellation');
    },

    selectReason: async (reasonIndex: number = 0) => {
      await page
        .locator('button.w-full.justify-start')
        .nth(reasonIndex)
        .click();
    },

    fillEssay: async (text: string) => {
      await page.locator('textarea[name="feedback"]').fill(text);
    },

    clickValdoCorrectButton: async () => {
      // The logic in ValdoStep.tsx uses lines 10, cols 9, solution "1-4"
      // index = lineIdx * cols + btnIdx = 1 * 9 + 4 = 13
      await page.getByRole('button', { name: 'Unsubscribe' }).nth(13).click();
    },

    fillEmail: async (email: string) => {
      await page
        .getByPlaceholder('loyal-customer@themostannoyingwebsite.com')
        .fill(email);
    },
  };
};
