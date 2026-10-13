'use client';

import { buttonVariants, Icon, type IconAliaseKey } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { Link } from '@/core/i18n/navigation';
import type { FundingConfig } from '../../schemas';
import { CryptoDonationButton } from './CryptoDonationButton';

type SupportLinkProps = {
  href: string;
  icon: IconAliaseKey;
  label: string;
};

function SupportLink({ href, icon, label }: SupportLinkProps) {
  // Base UI `Button` enforces button semantics and must not wrap links, so the
  // anchor is styled directly with `buttonVariants` (see the Base UI Button docs).
  return (
    <Link
      href={href}
      target="_blank"
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
} & ComponentProps<'section'>;

/**
 * Compact grid of support options (classic links + crypto popover buttons) with
 * an "other means" link underneath. Sits below the balance hero.
 */
export function SupportOptions({
  funding,
  className,
  ...rest
}: SupportOptionsProps) {
  const t = useTranslations();

  return (
    <section className={cn('flex flex-col gap-3', className)} {...rest}>
      <h3 className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        {t('funding.supportMethods')}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <SupportLink
          href={funding.buyMeACoffeeUrl}
          icon="mugHot"
          label={t('funding.buyMeACoffee')}
        />
        <SupportLink
          href={funding.paypalUrl}
          icon="paypal"
          label={t('funding.payPal')}
        />
        <CryptoDonationButton
          data-testid="crypto-wallet-btc"
          label={t('funding.crypto.bitcoin')}
          icon="bitcoin"
          address={funding.btcWallet.address}
          network={funding.btcWallet.network}
        />
        <CryptoDonationButton
          data-testid="crypto-wallet-eth"
          label={t('funding.crypto.ethereum')}
          icon="ethereum"
          address={funding.ethWallet.address}
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
