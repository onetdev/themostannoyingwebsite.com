'use client';

import { buttonVariants, Icon, type IconAliaseKey } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
import { Link } from '@/core/i18n/navigation';
import type { FundingConfig } from '../../schemas';
import type { DonationRate, DonationTier } from '../../types';
import { buildBitcoinUri, buildEthereumUri } from '../../utils/crypto-uri';
import { convertAmount, toDisplayAmount } from '../../utils/currency';
import { CryptoDonationButton } from './CryptoDonationButton';
import { SupportTiers } from './SupportTiers';

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
  currency: string;
  rates?: readonly DonationRate[];
  locale: string;
} & ComponentProps<'section'>;

/**
 * The offer: preset tiers (or a custom amount) plus the provider buttons. The
 * selected amount is carried into providers that accept one (PayPal); crypto
 * methods reveal their QR codes in a popover.
 */
export function SupportOptions({
  funding,
  tiers,
  currency,
  rates,
  locale,
  className,
  ...rest
}: SupportOptionsProps) {
  const t = useTranslations();
  const [amount, setAmount] = useState(() => tiers[0]?.amount ?? 0);

  const paypalHref =
    amount > 0
      ? `${funding.paypalUrl}/${toDisplayAmount(
          amount,
          { locale, currency, rates },
          { charm: true },
        )}${currency}`
      : funding.paypalUrl;

  const btcAmount = convertAmount(amount, 'BTC', rates);
  const ethAmount = convertAmount(amount, 'ETH', rates);
  const cryptoAmountLabel = (value: number, symbol: string) =>
    value > 0
      ? t('funding.crypto.amountLabel', {
          amount: value.toFixed(8),
          symbol,
        })
      : undefined;

  return (
    <section
      id="support"
      className={cn('flex scroll-mt-24 flex-col gap-4', className)}
      {...rest}
    >
      <SupportTiers
        tiers={tiers}
        currency={currency}
        rates={rates}
        locale={locale}
        selection={amount}
        onSelectionChange={setAmount}
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
      >
        {t('funding.alternativeOptionsLink')}
      </Link>
    </section>
  );
}
