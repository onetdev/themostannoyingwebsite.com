import type { Page } from '@playwright/test';

import { getSharedLocators } from './shared/Shared';

export const getDonatePage = (page: Page) => {
  const shared = getSharedLocators(page);

  return {
    ...shared,

    headline: page.getByRole('heading', { name: 'Donate' }),
    heroHeadline: page.getByRole('heading', {
      name: /Keep the internet/i,
    }),
    primaryCta: page.getByRole('link', { name: 'Support the project' }),
    shareCta: page.getByRole('button', { name: 'Share instead' }),
    tiersHeading: page.getByRole('heading', { name: 'Pick your poison' }),
    tierCoffee: page.getByTestId('tier-coffee'),
    tierHosting: page.getByTestId('tier-hosting'),
    tierCustom: page.getByTestId('tier-custom'),
    customAmountInput: page.getByTestId('tier-custom-input'),
    totalSupportReceivedHeading: page.getByRole('heading', {
      name: 'Total Support Received',
    }),
    donationBalance: page.getByTestId('donation-balance'),
    impactStatsHeading: page.getByRole('heading', {
      name: 'Impact in numbers',
    }),
    impactStatsMonthlyChart: page.getByTestId('impact-stats-monthly-chart'),
    impactStatsCumulativeChart: page.getByTestId(
      'impact-stats-cumulative-chart',
    ),
    impactStatMoneyBurnt: page.getByTestId('impact-stat-moneyBurnt'),
    kidneySupporter: page.getByTestId('impact-supporter-kidney'),
    buyMeACoffeeButton: page.getByRole('link', { name: 'Buy Me A Coffee' }),
    payPalButton: page.getByRole('link', { name: 'PayPal' }),
    cryptoWalletBtc: page.getByTestId('crypto-wallet-btc'),
    cryptoWalletEth: page.getByTestId('crypto-wallet-eth'),
    bitcoinButton: page.getByRole('button', { name: 'Bitcoin (BTC)' }),
    ethereumButton: page.getByRole('button', { name: 'Ethereum (ETH)' }),
    cryptoQr: page.getByTestId('crypto-qr'),
    alternativeOptionsLink: page.getByRole('link', {
      name: 'Click here for other means of supporting 😏',
    }),

    goto: async () => {
      await page.goto('/en/donate');
    },
  };
};
