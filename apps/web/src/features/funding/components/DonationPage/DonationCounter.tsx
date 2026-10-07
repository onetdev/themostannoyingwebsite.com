'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import { SlotDigit } from './SlotDigit';

export type DonationCounterProps = {
  /** Current donation balance in the response currency. */
  balance: number;
  /** Visual weight of the counter. `hero` is used as the page's focal point. */
  size?: 'default' | 'hero';
} & ComponentProps<'div'>;

export function DonationCounter({
  balance,
  size = 'default',
  className,
  ...rest
}: DonationCounterProps) {
  const amount = balance;
  const currency = '$';
  const [showNegative, setShowNegative] = useState(false);

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  // Convert amount to digits array
  const digits = absoluteAmount
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
      aria-label={`${currency}${amount}`}
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
        {currency}
      </span>
      <div aria-hidden className="flex gap-1">
        {digits.map((digit, idx) => (
          <SlotDigit key={idx} value={digit} delay={idx * 100} />
        ))}
      </div>
    </div>
  );
}
