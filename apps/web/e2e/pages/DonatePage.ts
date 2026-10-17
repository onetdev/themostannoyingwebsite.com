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
    heroStatusPulse: page.getByTestId('hero-status-pulse'),
    shareCta: page.getByRole('button', { name: 'Share instead' }),
    impactCta: page.getByRole('link', {
      name: 'See the impact in numbers',
    }),
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
    impactStatsGroup: page.getByTestId('impact-stats-group'),
    impactStatsSeparator: page.getByTestId('impact-stats-separator'),
    impactSupportersDescription: page.getByTestId(
      'impact-supporters-description',
    ),
    beforeAfterSlider: page.getByTestId('before-after-slider'),
    beforeAfterSeparator: page.getByTestId('before-after-separator'),
    faqAccountQuestion: page.getByRole('button', {
      name: 'Do I need an account to donate?',
    }),
    faqSoulQuestion: page.getByRole('button', {
      name: 'I have already promised my soul to the devil. What can I do?',
    }),
    impactStatCoffeesConsumed: page.getByTestId('impact-stat-coffeesConsumed'),
    impactStatTechnicalDebtInterest: page.getByTestId(
      'impact-stat-technicalDebtInterest',
    ),
    impactStatMonthlyVisitors: page.getByTestId('impact-stat-monthlyVisitors'),
    impactStatCaptchasCompleted: page.getByTestId(
      'impact-stat-captchasCompleted',
    ),
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
