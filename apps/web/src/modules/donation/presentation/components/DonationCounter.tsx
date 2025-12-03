'use client';

import { useEffect, useState } from 'react';

import { SlotDigit } from './SlotDigit';

export type DonationCounterProps = {
  amount: number;
  currency?: string;
};

export function DonationCounter({
  amount,
  currency = '$',
}: DonationCounterProps) {
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
  const digitColor = showNegative ? 'text-on-error' : 'text-on-success';
  const borderColor = showNegative ? 'border-error' : 'border-success';
  const bgGradient = showNegative ? 'bg-error' : 'bg-success';

  return (
    <div
      aria-label={`${currency}${amount}`}
      className={`flex items-center justify-center gap-2 p-6 ${bgGradient} rounded-lg border-2 shadow-2xl ${borderColor} transition-all duration-500`}>
      <span
        aria-hidden
        className={`text-5xl font-bold ${digitColor} transition-all duration-500 ${
          isNegative
            ? showNegative
              ? 'opacity-100'
              : 'opacity-0'
            : 'w-0 opacity-0'
        }`}>
        -
      </span>
      <span
        aria-hidden
        className={`text-5xl font-bold ${digitColor} transition-colors duration-500`}>
        {currency}
      </span>
      <div aria-hidden className="flex gap-1">
        {digits.map((digit, idx) => (
          <SlotDigit key={idx} value={digit} delay={idx * 100} />
        ))}
      </div>
      <span
        aria-hidden
        className={`text-2xl font-bold ${digitColor} ml-2 transition-colors duration-500`}>
        .00
      </span>
    </div>
  );
}
