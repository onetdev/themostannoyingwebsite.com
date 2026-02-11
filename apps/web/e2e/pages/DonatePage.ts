import { type Page } from '@playwright/test';

import { getFooter } from './shared/Footer';
import { getHeader } from './shared/Header';

export const getDonatePage = (page: Page) => {
  const header = getHeader(page);
  const footer = getFooter(page);

  return {
    ...header,
    ...footer,

    headline: page.getByRole('heading', { name: 'Donate' }),
    jarAnimation: page.getByTestId('jar-animation'),
    totalSupportReceivedHeading: page.getByRole('heading', {
      name: 'Total Support Received',
    }),
    donationBalance: page.getByTestId('donation-balance'),
    buyMeACoffeeButton: page.getByRole('link', { name: 'Buy Me A Coffee' }),
    payPalButton: page.getByRole('link', { name: 'PayPay' }),
    cryptoWalletList: page.getByTestId('crypto-wallet-list'),
    alternativeOptionsLink: page.getByRole('link', {
      name: 'Click here for other means of supporting 😏',
    }),

    goto: async () => {
      await page.goto('/en/donate');
    },
  };
};
