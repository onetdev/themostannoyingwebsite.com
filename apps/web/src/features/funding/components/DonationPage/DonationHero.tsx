'use client';

import { buttonVariants, Icon } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useShareAction } from '@/features/share/hooks';
import type { FundingDonationSummary } from '../../types';
import { formatMoney, type MoneyContext } from '../../utils/currency';

export type DonationHeroProps = {
  summary?: FundingDonationSummary;
  locale: string;
  currency: string;
  className?: string;
};

/**
 * Product-page hero: a status chip tied to the balance, the value proposition,
 * an optional goal progress bar, the primary/secondary calls to action, and
 * trust + social-proof lines.
 */
export function DonationHero({
  summary,
  locale,
  currency,
  className,
}: DonationHeroProps) {
  const t = useTranslations();
  const share = useShareAction();

  const balance = summary?.totals.balance ?? 0;
  const isNegative = balance < 0;
  const goal = summary?.goal;
  const supporterCount = summary?.supporterCount ?? 0;
  const money: MoneyContext = { locale, currency, rates: summary?.rates };

  // "Raised this period" is the most recent month's donations; the monthly
  // history is illustrative, so this is a joke metric like the rest.
  const raisedThisMonth = summary?.monthly.at(-1)?.donations ?? 0;
  const goalProgress =
    goal && goal.amount > 0
      ? Math.min(100, Math.round((raisedThisMonth / goal.amount) * 100))
      : 0;

  const showGoal = Boolean(goal);
  const showSupporters = supporterCount > 0;

  return (
    <section
      className={cn('flex flex-col items-center gap-4 text-center', className)}
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

      {showGoal && goal && (
        <div className="w-full max-w-sm">
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{t(goal.labelKey as AppTranslationKey)}</span>
            <span>
              {t('funding.goal.progress', {
                current: formatMoney(raisedThisMonth, money, {
                  fractionDigits: 0,
                }),
                target: formatMoney(goal.amount, money, { fractionDigits: 0 }),
              })}
            </span>
          </div>
          <div className="bg-muted mt-1 h-2 w-full overflow-hidden rounded-full">
            <div
              className={cn(
                'h-full rounded-full transition-[width] duration-500',
                isNegative ? 'bg-error' : 'bg-success',
              )}
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="#support"
          // `data-slot="button"` opts out of the global `a` link styles, which
          // would otherwise paint the label `text-primary` on `bg-primary`.
          data-slot="button"
          className={buttonVariants({ size: 'lg' })}
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
