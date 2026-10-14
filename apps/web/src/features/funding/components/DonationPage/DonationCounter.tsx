'use client';

import { useLocale } from 'next-intl';
import { type ComponentProps, useEffect, useState } from 'react';
import { DONATION_BASE_CURRENCY, type DonationRate } from '../../types';
import { getCurrencySymbol, toDisplayAmount } from '../../utils/currency';
import { SlotDigit } from './SlotDigit';

export type DonationCounterProps = {
  /** Current donation balance in the base currency. */
  balance: number;
  /** Visual weight of the counter. `hero` is used as the page's focal point. */
  size?: 'default' | 'hero';
  /** Display currency code. */
  currency?: string;
  /** Static rates for converting the base amount to `currency`. */
  rates?: readonly DonationRate[];
} & ComponentProps<'div'>;

export function DonationCounter({
  balance,
  size = 'default',
  currency = DONATION_BASE_CURRENCY,
  rates,
  className,
  ...rest
}: DonationCounterProps) {
  const locale = useLocale();
  const [showNegative, setShowNegative] = useState(false);

  const isNegative = balance < 0;
  const displayAmount = Math.round(
    toDisplayAmount(
      Math.abs(balance),
      { locale, currency, rates },
      { fractionDigits: 0 },
    ),
  );
  const symbol = getCurrencySymbol(locale, currency);

  // Convert amount to digits array
  const digits = displayAmount
    .toString()
    .padStart(6, '0')
    .split('')
    .map(Number);

  useEffect(() => {
    // Reveal negative sign after animation completes
    if (isNegative) {
      // Calculate when last digit finishes
      // Last digit delay + max spin time + settle time
      const lastDigitDelay = (digits.length - 1) * 100;
      const spinDuration = 30 * 50; // max 30 spins at 50ms each
      const settleDuration = 100;
      const totalDuration =
        lastDigitDelay + spinDuration + settleDuration + 200; // +200ms buffer

      const timer = setTimeout(() => {
        setShowNegative(true);
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [isNegative, digits.length]);

  // Color scheme based on whether we're showing negative
  const digitColor = showNegative
    ? 'text-error-foreground'
    : 'text-success-foreground';
  const borderColor = showNegative ? 'border-error' : 'border-success';
  const bgGradient = showNegative ? 'bg-error' : 'bg-success';
  const sizeClasses =
    size === 'hero'
      ? 'gap-3 rounded-xl border-4 p-8'
      : 'gap-2 rounded-lg border-2 p-6';

  return (
    <div
      role="img"
      aria-label={`${symbol}${displayAmount}`}
      className={`flex items-center justify-center shadow-2xl transition-all duration-500 ${sizeClasses} ${bgGradient} ${borderColor} ${className ?? ''}`}
      {...rest}
    >
      <span
        aria-hidden
        className={`text-3xl font-bold ${digitColor} transition-all duration-500 ${
          isNegative
            ? showNegative
              ? 'opacity-100'
              : 'opacity-0'
            : 'w-0 opacity-0'
        }`}
      >
        -
      </span>
      <span
        aria-hidden
        className={`text-3xl font-bold ${digitColor} transition-colors duration-500`}
      >
        {symbol}
      </span>
      <div aria-hidden className="flex gap-1">
        {digits.map((digit, idx) => (
          <SlotDigit key={idx} value={digit} delay={idx * 100} />
        ))}
      </div>
    </div>
  );
}
