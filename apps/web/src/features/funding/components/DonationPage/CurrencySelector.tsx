'use client';

import { ToggleGroup, ToggleGroupItem } from '@maw/ui-lib';
import { cn } from 'cn';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

export type CurrencySelectorProps = {
  /** Currency codes offered by the API, in display order. */
  currencies: readonly string[];
  /** Currently selected currency code. */
  currency: string;
  onCurrencyChange: (currency: string) => void;
  className?: string;
};

/**
 * Compact currency picker for the support options. Mirrors the billing-cycle
 * selector: a segmented button group rendered inside a muted pill.
 */
export function CurrencySelector({
  currencies,
  currency,
  onCurrencyChange,
  className,
}: CurrencySelectorProps) {
  const t = useTranslations();
  const locale = useLocale();

  const displayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([locale], { type: 'currency' });
    } catch {
      return undefined;
    }
  }, [locale]);

  const currencyName = (code: string) => displayNames?.of(code) ?? code;

  return (
    <ToggleGroup
      className={cn('bg-muted rounded-lg p-1', className)}
      value={[currency]}
      aria-label={t('funding.currency.label')}
      onValueChange={(value) => {
        const next = value[0];
        if (next) {
          onCurrencyChange(next);
        }
      }}
    >
      {currencies.map((code) => (
        <ToggleGroupItem
          key={code}
          value={code}
          size="sm"
          title={currencyName(code)}
          aria-label={currencyName(code)}
          className="aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          data-testid={`currency-${code}`}
        >
          {code}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
