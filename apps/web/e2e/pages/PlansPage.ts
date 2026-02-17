import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getPlansPage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

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
