import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getDonatePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Donate' }),
    jarAnimation: page.getByTestId('jar-animation'),
    totalSupportReceivedHeading: page.getByRole('heading', {
      name: 'Total Support Received',
    }),
    donationBalance: page.getByTestId('donation-balance'),
    buyMeACoffeeButton: page.getByRole('link', { name: 'Buy Me A Coffee' }),
    payPalButton: page.getByRole('link', { name: 'PayPal' }),
    cryptoWalletList: page.getByTestId('crypto-wallet-list'),
    alternativeOptionsLink: page.getByRole('link', {
      name: 'Click here for other means of supporting 😏',
    }),

    goto: async () => {
      await page.goto('/en/donate');
    },
  };
};
