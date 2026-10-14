'use client';

import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { DonationRate, DonationTier } from '../../types';
import { formatMoney, type MoneyContext } from '../../utils/currency';

export type SupportTiersProps = {
  tiers: readonly DonationTier[];
  currency: string;
  rates?: readonly DonationRate[];
  locale: string;
  /** Selected amount, in the base currency. */
  selection: number;
  onSelectionChange: (amount: number) => void;
  className?: string;
};

/**
 * Preset support tiers with a custom-amount escape hatch. Selection is
 * controlled by the parent so the provider buttons can carry the amount.
 * Preset labels are charm-rounded in the visitor's display currency.
 */
export function SupportTiers({
  tiers,
  currency,
  rates,
  locale,
  selection,
  onSelectionChange,
  className,
}: SupportTiersProps) {
  const t = useTranslations();
  const [isCustom, setIsCustom] = useState(false);

  const money: MoneyContext = { locale, currency, rates };
  const matchesTier = tiers.some((tier) => tier.amount === selection);
  const showCustomInput = isCustom || !matchesTier;

  const selectTier = (amount: number) => {
    setIsCustom(false);
    onSelectionChange(amount);
  };

  const updateCustom = (value: string) => {
    const parsed = Number(value);
    onSelectionChange(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h3 className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
        {t('funding.tiers.heading')}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {tiers.map((tier) => {
          const active = !showCustomInput && tier.amount === selection;

          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={active}
              data-testid={`tier-${tier.id}`}
              onClick={() => selectTier(tier.amount)}
              className={cn(
                'flex flex-col gap-0.5 rounded-lg border p-3 text-left transition-colors',
                active
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:bg-accent',
              )}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden>{tier.emoji}</span>
                {t(tier.labelKey as AppTranslationKey)}
                <span className="ml-auto">
                  {formatMoney(tier.amount, money, { charm: true })}
                </span>
              </span>
              {tier.blurbKey && (
                <span className="text-muted-foreground text-xs">
                  {t(tier.blurbKey as AppTranslationKey)}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={showCustomInput}
          data-testid="tier-custom"
          onClick={() => setIsCustom(true)}
          className={cn(
            'flex items-center rounded-lg border p-3 text-left text-sm font-semibold transition-colors',
            showCustomInput
              ? 'border-primary bg-primary/10'
              : 'border-border hover:bg-accent',
          )}
        >
          {t('funding.tiers.custom')}
        </button>
      </div>

      {showCustomInput && (
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={selection || ''}
          onChange={(event) => updateCustom(event.target.value)}
          placeholder={t('funding.tiers.amountPlaceholder')}
          aria-label={t('funding.tiers.amountPlaceholder')}
          data-testid="tier-custom-input"
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-[3px]"
        />
      )}
    </div>
  );
}
