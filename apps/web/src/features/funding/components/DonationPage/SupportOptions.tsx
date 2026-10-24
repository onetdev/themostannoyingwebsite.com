'use client';

import { buttonVariants, Icon, type IconAliaseKey } from '@maw/ui-lib';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
import {
  convertAmount,
  getCurrencyDecimals,
  getDisplayCurrencies,
  toBaseAmount,
  toDisplayAmount,
} from '@/core/currency';
import { Link } from '@/core/i18n/navigation';
import type { FundingConfig } from '../../schemas';
import {
  DONATION_BASE_CURRENCY,
  DONATION_CRYPTO_CODES,
  DONATION_FALLBACK_RATES,
  type DonationRate,
  type DonationTier,
} from '../../types';
import { buildBitcoinUri, buildEthereumUri } from '../../utils/crypto-uri';
import { CryptoDonationButton } from './CryptoDonationButton';
import { CurrencySelector } from './CurrencySelector';
import { type SupportSelection, SupportTiers } from './SupportTiers';

type SupportLinkProps = {
  href: string;
  icon: IconAliaseKey;
  label: string;
};

function SupportLink({ href, icon, label }: SupportLinkProps) {
  // Base UI `Button` enforces button semantics and must not wrap links, so the
  // anchor is styled directly with `buttonVariants`. `data-slot="button"` opts
  // out of the global `a` link styles that would clobber the button colors.
  return (
    <Link
      href={href}
      target="_blank"
      data-slot="button"
      data-track="donation:provider"
      data-track-key={icon}
      className={buttonVariants({
        variant: 'secondary',
        size: 'default',
        className: 'w-full',
      })}
    >
      <Icon icon={icon} aria-hidden />
      {label}
    </Link>
  );
}

export type SupportOptionsProps = {
  funding: FundingConfig;
  tiers: readonly DonationTier[];
  rates?: readonly DonationRate[];
  /** Base currency the rates are relative to; falls back to the bundled EUR base. */
  baseCurrency?: string;
  locale: string;
} & ComponentProps<'section'>;

function roundToCurrency(
  value: number,
  locale: string,
  currency: string,
): number {
  return Number(value.toFixed(getCurrencyDecimals(locale, currency)));
}

/**
 * The offer: preset tiers (or a custom amount) plus the provider buttons. The
 * visitor picks the display currency for the offer; the balance and impact
 * figures render in the currency the API tagged them with. The selected amount is
 * carried into providers that accept one (PayPal), and crypto methods reveal
 * their QR codes in a popover with an estimate derived from the base amount.
 */
export function SupportOptions({
  funding,
  tiers,
  rates,
  baseCurrency = DONATION_BASE_CURRENCY,
  locale,
  className,
  ...rest
}: SupportOptionsProps) {
  const t = useTranslations();
  const [currency, setCurrency] = useState<string>(baseCurrency);
  const [selection, setSelection] = useState<SupportSelection>(() =>
    tiers[0]
      ? { kind: 'tier', tierId: tiers[0].id }
      : { kind: 'custom', amount: { value: 0, currency: baseCurrency } },
  );

  const selectedTier =
    selection.kind === 'tier'
      ? tiers.find((tier) => tier.id === selection.tierId)
      : undefined;

  // The API normally supplies the rates; the seed keeps the page usable when it
  // is unreachable (the content client degrades to an empty summary).
  const effectiveRates = rates ?? DONATION_FALLBACK_RATES;

  // What the visitor will pay in the selected currency. Presets are charm
  // rounded; custom amounts keep exactly what was typed.
  const displayAmount = selectedTier
    ? toDisplayAmount(
        selectedTier.amount.value,
        {
          locale,
          currency,
          base: selectedTier.amount.currency,
          rates: effectiveRates,
        },
        { charm: true },
      )
    : selection.kind === 'custom'
      ? selection.amount.value
      : 0;

  // Crypto estimates and provider links are always derived from the base
  // currency, so convert whichever currency-tagged amount is selected.
  const baseAmount =
    selectedTier && selection.kind === 'tier'
      ? toBaseAmount(selectedTier.amount.value, {
          currency: selectedTier.amount.currency,
          base: baseCurrency,
          rates: effectiveRates,
        })
      : selection.kind === 'custom'
        ? toBaseAmount(selection.amount.value, {
            currency: selection.amount.currency,
            base: baseCurrency,
            rates: effectiveRates,
          })
        : 0;

  const currencies = getDisplayCurrencies(effectiveRates, {
    base: baseCurrency,
    exclude: DONATION_CRYPTO_CODES,
  });
  const showCurrencySelector = currencies.length > 1;

  const paypalHref =
    displayAmount > 0
      ? `${funding.paypalUrl}/${displayAmount}${currency}`
      : funding.paypalUrl;

  const btcAmount = convertAmount(baseAmount, 'BTC', {
    base: baseCurrency,
    rates: effectiveRates,
  });
  const ethAmount = convertAmount(baseAmount, 'ETH', {
    base: baseCurrency,
    rates: effectiveRates,
  });
  const cryptoAmountLabel = (value: number, symbol: string) =>
    value > 0
      ? t('funding.crypto.amountLabel', {
          amount: value.toFixed(8),
          symbol,
        })
      : undefined;

  const changeCurrency = (nextCurrency: string) => {
    if (nextCurrency === currency) {
      return;
    }

    // Preserve the underlying value when switching display currencies.
    if (selection.kind === 'custom') {
      const base = toBaseAmount(selection.amount.value, {
        currency: selection.amount.currency,
        base: baseCurrency,
        rates: effectiveRates,
      });
      const converted = convertAmount(base, nextCurrency, {
        base: baseCurrency,
        rates: effectiveRates,
      });

      setSelection({
        kind: 'custom',
        amount: {
          value: roundToCurrency(converted, locale, nextCurrency),
          currency: nextCurrency,
        },
      });
    }

    setCurrency(nextCurrency);
  };

  return (
    <section
      id="support"
      className={cn('flex scroll-mt-24 flex-col gap-4', className)}
      data-track-section="funding:providers"
      {...rest}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
          {t('funding.tiers.heading')}
        </h3>
        {showCurrencySelector && (
          <CurrencySelector
            currencies={currencies}
            currency={currency}
            onCurrencyChange={changeCurrency}
          />
        )}
      </div>

      <SupportTiers
        tiers={tiers}
        currency={currency}
        rates={effectiveRates}
        locale={locale}
        selection={selection}
        onSelectionChange={setSelection}
      />

      <div className="grid grid-cols-2 gap-3">
        <SupportLink
          href={funding.buyMeACoffeeUrl}
          icon="mugHot"
          label={t('funding.buyMeACoffee')}
        />
        <SupportLink
          href={paypalHref}
          icon="paypal"
          label={t('funding.payPal')}
        />
        <CryptoDonationButton
          data-testid="crypto-wallet-btc"
          label={t('funding.crypto.bitcoin')}
          icon="bitcoin"
          address={funding.btcWallet.address}
          qrValue={buildBitcoinUri(funding.btcWallet.address, btcAmount)}
          amountLabel={cryptoAmountLabel(btcAmount, 'BTC')}
          network={funding.btcWallet.network}
        />
        <CryptoDonationButton
          data-testid="crypto-wallet-eth"
          label={t('funding.crypto.ethereum')}
          icon="ethereum"
          address={funding.ethWallet.address}
          qrValue={buildEthereumUri(funding.ethWallet.address, ethAmount)}
          amountLabel={cryptoAmountLabel(ethAmount, 'ETH')}
        />
      </div>

      <Link
        href={funding.alternativeOptionsUrl}
        target="_blank"
        className="text-center text-sm"
        data-track="donation:alternative-options"
      >
        {t('funding.alternativeOptionsLink')}
      </Link>
    </section>
  );
}
