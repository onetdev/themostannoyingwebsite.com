import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getPlansPage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'The Ultimate AI Upgrade' }),
    urgencyCountdown: page.getByTestId('urgency-countdown'),

    billingCycleMonthly: page.getByTestId('billing-cycle-monthly'),
    billingCycleYearly: page.getByTestId('billing-cycle-yearly'),
    billingCycleBiyearly: page.getByTestId('billing-cycle-biyearly'),

    getPlanCard: (key: string) => {
      const card = page.getByTestId(`plan-card-${key}`);
      return {
        card,
        selectButton: card.getByText('Select', { exact: true }),
        doneButton: card.getByText('Done', { exact: true }),
        originalPrice: card.getByTestId('original-price'),
        discountedPrice: card.getByTestId('discounted-price'),
        chargeDisclaimer: card.getByTestId('charge-disclaimer'),
      };
    },

    goto: async () => {
      await page.goto('/en/plans');
    },
  };
};
