'use client';

import { buttonVariants, Icon } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useShareAction } from '@/features/share/hooks';
import type { FundingDonationSummary } from '../../types';

export type DonationHeroProps = {
  summary?: FundingDonationSummary;
  className?: string;
};

/**
 * Product-page hero: a status chip tied to the balance, the value proposition,
 * the primary/secondary calls to action, and trust + social-proof lines.
 */
export function DonationHero({ summary, className }: DonationHeroProps) {
  const t = useTranslations();
  const share = useShareAction();

  const balance = summary?.totals.balance ?? 0;
  const isNegative = balance < 0;
  const supporterCount = summary?.supporterCount ?? 0;
  const showSupporters = supporterCount > 0;

  return (
    <section
      className={cn('flex flex-col items-start gap-4 text-left', className)}
    >
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase',
          isNegative
            ? 'border-error text-error'
            : 'border-success text-success',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'size-2 rounded-full',
            isNegative ? 'bg-error' : 'bg-success',
          )}
        />
        {t(
          isNegative
            ? 'funding.hero.statusNegative'
            : 'funding.hero.statusPositive',
        )}
      </span>

      <h2 className="max-w-[28ch] text-2xl text-balance md:text-3xl">
        {t('funding.hero.headline')}
      </h2>
      <p className="text-muted-foreground max-w-prose text-sm">
        {t('funding.hero.subhead')}
      </p>

      <div className="flex flex-wrap items-center justify-start gap-3">
        {/*
          The primary CTA only makes sense when the support options sit below
          the hero (mobile). From `md` up they are beside it, so it is hidden.
        */}
        <a
          href="#support"
          // `data-slot="button"` opts out of the global `a` link styles, which
          // would otherwise paint the label `text-primary` on `bg-primary`.
          data-slot="button"
          className={buttonVariants({ size: 'lg', className: 'md:hidden' })}
        >
          <Icon icon="handHoldingDollar" aria-hidden />
          {t('funding.hero.primaryCta')}
        </a>
        <button
          type="button"
          onClick={() => share()}
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          <Icon icon="share" aria-hidden />
          {t('funding.hero.shareCta')}
        </button>
        <a href="#impact" className="text-sm font-medium">
          {t('funding.hero.impactCta')}
        </a>
      </div>

      <p className="text-muted-foreground text-xs">{t('funding.hero.trust')}</p>
      {showSupporters && (
        <p className="text-muted-foreground text-xs">
          {t('funding.hero.supporters', { count: supporterCount })}
        </p>
      )}
    </section>
  );
}
