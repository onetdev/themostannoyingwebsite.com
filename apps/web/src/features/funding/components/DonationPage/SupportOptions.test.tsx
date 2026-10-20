/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { FundingConfig } from '../../schemas';
import type { DonationRate, DonationTier } from '../../types';
import { buildBitcoinUri } from '../../utils/crypto-uri';
import { SupportOptions } from './SupportOptions';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated:${key}`,
  useLocale: () => 'en-US',
}));

jest.mock('@/core/i18n/navigation', () => {
  const React = jest.requireActual('react');

  return {
    Link: ({
      href,
      children,
      ...props
    }: {
      href: string;
      children?: React.ReactNode;
    }) => React.createElement('a', { href, ...props }, children),
  };
});

jest.mock('../../utils/crypto-uri', () => ({
  buildBitcoinUri: jest.fn(() => 'bitcoin:mock'),
  buildEthereumUri: jest.fn(() => 'ethereum:mock'),
}));

const mockedBuildBitcoinUri = jest.mocked(buildBitcoinUri);

const funding: FundingConfig = {
  assets: { beforeImage: '/before.webp', afterImage: '/after.webp' },
  buyMeACoffeeUrl: 'https://buymeacoffee.com/onetdev',
  paypalUrl: 'https://paypal.me/onetdev',
  ethWallet: { address: '0xeth' },
  btcWallet: { network: 'Bitcoin', address: 'bc1btc' },
  alternativeOptionsUrl: 'https://onet.dev/donate',
};

const tiers: DonationTier[] = [
  {
    id: 'coffee',
    amount: { value: 5, currency: 'EUR' },
    emoji: '☕',
    labelKey: 'funding.tiers.coffee',
    blurbKey: 'funding.tiers.coffeeBlurb',
  },
  {
    id: 'kebab',
    amount: { value: 15, currency: 'EUR' },
    emoji: '🥙',
    labelKey: 'funding.tiers.kebab',
    blurbKey: 'funding.tiers.kebabBlurb',
  },
];

const rates: DonationRate[] = [
  { code: 'USD', rate: 2 },
  { code: 'GBP', rate: 0.5 },
  { code: 'JPY', rate: 160 },
  { code: 'BTC', rate: 0.00001 },
  { code: 'ETH', rate: 0.0003 },
];

function renderSupportOptions() {
  return render(
    <SupportOptions
      funding={funding}
      tiers={tiers}
      rates={rates}
      locale="en-US"
    />,
  );
}

function paypalLink() {
  return screen.getByRole('link', { name: 'translated:funding.payPal' });
}

describe('SupportOptions', () => {
  beforeEach(() => {
    mockedBuildBitcoinUri.mockClear();
  });

  it('starts in EUR and offers the API fiat currencies without crypto', () => {
    renderSupportOptions();

    expect(screen.getByTestId('tier-coffee')).toHaveTextContent('€4.99');
    expect(paypalLink()).toHaveAttribute(
      'href',
      'https://paypal.me/onetdev/4.99EUR',
    );

    expect(screen.getByTestId('currency-EUR')).toBeVisible();
    expect(screen.getByTestId('currency-USD')).toBeVisible();
    expect(screen.getByTestId('currency-GBP')).toBeVisible();
    expect(screen.getByTestId('currency-JPY')).toBeVisible();
    expect(screen.queryByTestId('currency-BTC')).not.toBeInTheDocument();
    expect(screen.queryByTestId('currency-ETH')).not.toBeInTheDocument();
  });

  it('re-prices the presets and the PayPal link when the currency changes', () => {
    renderSupportOptions();

    fireEvent.click(screen.getByTestId('currency-USD'));

    expect(screen.getByTestId('tier-coffee')).toHaveTextContent('$9.99');
    expect(paypalLink()).toHaveAttribute(
      'href',
      'https://paypal.me/onetdev/9.99USD',
    );

    fireEvent.click(screen.getByTestId('currency-JPY'));

    expect(screen.getByTestId('tier-coffee')).toHaveTextContent('¥799');
    expect(paypalLink()).toHaveAttribute(
      'href',
      'https://paypal.me/onetdev/799JPY',
    );
  });

  it('keeps the crypto estimate based on the EUR amount when the currency changes', () => {
    renderSupportOptions();

    expect(mockedBuildBitcoinUri).toHaveBeenLastCalledWith('bc1btc', 0.00005);

    fireEvent.click(screen.getByTestId('currency-USD'));

    // Same EUR 5 tier, so the BTC estimate must not move with the display currency.
    expect(mockedBuildBitcoinUri).toHaveBeenLastCalledWith('bc1btc', 0.00005);
  });

  it('offers a single always-visible amount field instead of a custom option', () => {
    renderSupportOptions();

    const input = screen.getByTestId('tier-custom-input');

    // The amount tile is a real input, not a button that reveals a separate field.
    expect(input).toBeVisible();
    expect(input).toHaveValue(null);
    expect(screen.queryByTestId('tier-custom')).not.toBeInTheDocument();
  });

  it('converts a custom amount from the selected currency back to EUR', () => {
    renderSupportOptions();

    fireEvent.click(screen.getByTestId('currency-USD'));

    const input = screen.getByTestId('tier-custom-input');
    fireEvent.focus(input);

    // Seeded with the active tier's displayed amount.
    expect(input).toHaveValue(9.99);

    fireEvent.change(input, { target: { value: '20' } });

    expect(paypalLink()).toHaveAttribute(
      'href',
      'https://paypal.me/onetdev/20USD',
    );
    // 20 USD / 2 = 10 EUR, at 0.00001 BTC per EUR.
    expect(mockedBuildBitcoinUri).toHaveBeenLastCalledWith('bc1btc', 0.0001);
  });

  it('preserves the custom value when switching currencies', () => {
    renderSupportOptions();

    fireEvent.click(screen.getByTestId('currency-USD'));
    fireEvent.focus(screen.getByTestId('tier-custom-input'));
    fireEvent.change(screen.getByTestId('tier-custom-input'), {
      target: { value: '20' },
    });

    // 20 USD = 10 EUR = 5 GBP.
    fireEvent.click(screen.getByTestId('currency-GBP'));

    expect(screen.getByTestId('tier-custom-input')).toHaveValue(5);
    expect(paypalLink()).toHaveAttribute(
      'href',
      'https://paypal.me/onetdev/5GBP',
    );
  });
});
