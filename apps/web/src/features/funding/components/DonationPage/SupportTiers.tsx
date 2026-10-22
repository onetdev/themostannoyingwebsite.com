'use client';

import { cn } from 'cn';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';
import {
  formatMoney,
  getCurrencyDecimals,
  toDisplayAmount,
} from '@/core/currency';
import type {
  DonationCurrencyAmount,
  DonationRate,
  DonationTier,
} from '../../types';

/**
 * What the visitor picked: a preset tier or a custom amount. The custom amount
 * carries the currently selected display currency.
 */
export type SupportSelection =
  | { kind: 'tier'; tierId: string }
  | { kind: 'custom'; amount: DonationCurrencyAmount };

export type SupportTiersProps = {
  tiers: readonly DonationTier[];
  currency: string;
  rates?: readonly DonationRate[];
  locale: string;
  selection: SupportSelection;
  onSelectionChange: (selection: SupportSelection) => void;
  className?: string;
};

function formatDraftAmount(
  amount: number,
  locale: string,
  currency: string,
): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return '';
  }

  return amount.toFixed(getCurrencyDecimals(locale, currency));
}

type CustomAmountInputProps = {
  amount: number;
  /** Amount to seed the field with when it is activated but still empty. */
  seedAmount: number;
  currency: string;
  locale: string;
  isActive: boolean;
  onAmountChange: (amount: number) => void;
} & Omit<
  ComponentProps<'input'>,
  'onChange' | 'onFocus' | 'value' | 'type' | 'placeholder' | 'aria-label'
>;

/**
 * Free-form amount in the selected currency, rendered as one of the tiles.
 * Focusing it activates the custom selection; typing updates the amount. Keeps
 * the raw draft locally so partial input (a trailing decimal separator) is not
 * reformatted away; the parent receives the parsed numeric amount.
 */
function CustomAmountInput({
  amount,
  seedAmount,
  currency,
  locale,
  isActive,
  onAmountChange,
  className,
  ...rest
}: CustomAmountInputProps) {
  const t = useTranslations();
  const [draft, setDraft] = useState(() =>
    formatDraftAmount(amount, locale, currency),
  );
  const decimals = getCurrencyDecimals(locale, currency);

  const updateAmount = (raw: string) => {
    setDraft(raw);
    const parsed = Number(raw);

    onAmountChange(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
  };

  const activate = () => {
    if (isActive) {
      return;
    }

    if (draft.trim() === '') {
      setDraft(formatDraftAmount(seedAmount, locale, currency));
      onAmountChange(seedAmount);
      return;
    }

    onAmountChange(Number(draft));
  };

  return (
    <div className="relative h-full">
      <input
        {...rest}
        type="number"
        min={1}
        step={decimals === 0 ? 1 : 0.01}
        inputMode={decimals === 0 ? 'numeric' : 'decimal'}
        value={draft}
        onChange={(event) => updateAmount(event.target.value)}
        onFocus={activate}
        onClick={activate}
        placeholder={t('funding.tiers.amountPlaceholder')}
        aria-label={`${t('funding.tiers.amountPlaceholder')} (${currency})`}
        data-testid="tier-custom-input"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 h-full min-h-10 w-full rounded-lg border px-3 pr-14 text-sm outline-none transition-colors focus-visible:ring-[3px]',
          isActive
            ? 'border-primary bg-primary/10'
            : 'border-border bg-background hover:bg-accent',
          className,
        )}
      />
      <span
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold"
      >
        {currency}
      </span>
    </div>
  );
}

/**
 * Preset support tiers with a free-form amount tile, displayed in the
 * visitor-selected currency. The amount tile is always visible; focusing it
 * activates the custom selection. Selection is tracked by tier id so switching
 * currency does not clear the active preset.
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

  const selectedTier =
    selection.kind === 'tier'
      ? tiers.find((tier) => tier.id === selection.tierId)
      : undefined;
  const isCustom = selection.kind === 'custom';

  const currentDisplayAmount = selectedTier
    ? toDisplayAmount(
        selectedTier.amount.value,
        {
          locale,
          currency,
          base: selectedTier.amount.currency,
          rates,
        },
        { charm: true },
      )
    : isCustom
      ? selection.amount.value
      : 0;

  const selectAmount = (value: number) => {
    onSelectionChange({ kind: 'custom', amount: { value, currency } });
  };

  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      data-track-section="funding:donation"
    >
      <div className="grid grid-cols-2 gap-3">
        {tiers.map((tier) => {
          const active =
            selection.kind === 'tier' && tier.id === selection.tierId;

          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={active}
              data-testid={`tier-${tier.id}`}
              data-track="donation:tier"
              data-track-key={tier.id}
              onClick={() =>
                onSelectionChange({ kind: 'tier', tierId: tier.id })
              }
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
                  {formatMoney(
                    tier.amount.value,
                    {
                      locale,
                      currency,
                      base: tier.amount.currency,
                      rates,
                    },
                    { charm: true },
                  )}
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

        <CustomAmountInput
          key={currency}
          amount={isCustom ? selection.amount.value : 0}
          seedAmount={currentDisplayAmount}
          currency={currency}
          locale={locale}
          isActive={isCustom}
          onAmountChange={selectAmount}
        />
      </div>
    </div>
  );
}
