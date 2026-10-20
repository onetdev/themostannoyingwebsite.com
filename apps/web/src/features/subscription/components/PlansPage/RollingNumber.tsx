'use client';

import { cn } from 'cn';
import type { ComponentProps, CSSProperties } from 'react';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Back-out easing that overshoots slightly, giving the roll a springy feel.
 */
const ROLL_EASING = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]';

export interface RollingNumberProps extends ComponentProps<'span'> {
  /** Formatted value to render, e.g. `"$99.00/mo"`. Only digit characters roll. */
  value: string;
  /** Duration of the roll transition in milliseconds. */
  durationMs?: number;
}

function isDigit(character: string): boolean {
  return character >= '0' && character <= '9';
}

interface RollingDigitProps {
  digit: number;
  durationMs: number;
}

/**
 * A `1em`-tall window over a vertical `0`-`9` column. The column is moved with
 * a `translateY(calc(var(--rolling-digit) * -1em))` so changing the digit
 * animates the wheel instead of re-rendering the number.
 */
function RollingDigit({ digit, durationMs }: RollingDigitProps) {
  return (
    <span className="inline-block h-[1em] overflow-hidden leading-none">
      <span
        data-rolling-digit={digit}
        className={cn(
          'flex flex-col leading-none transition-transform motion-reduce:transition-none',
          ROLL_EASING,
        )}
        style={
          {
            transform: 'translateY(calc(var(--rolling-digit) * -1em))',
            transitionDuration: `${durationMs}ms`,
            '--rolling-digit': digit,
          } as CSSProperties
        }
      >
        {DIGITS.map((value) => (
          <span key={value} className="block h-[1em] leading-none">
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({
  className,
  durationMs = 700,
  value,
  ...rest
}: RollingNumberProps) {
  return (
    <span
      {...rest}
      className={cn('inline-flex items-center leading-none', className)}
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center leading-none"
      >
        {Array.from(value).map((character, position) => {
          if (!isDigit(character)) {
            return (
              <span
                // Positional identity keeps static characters stable across updates.
                key={`static-${position}`}
                className="inline-block leading-none"
              >
                {character}
              </span>
            );
          }

          return (
            <RollingDigit
              // Positional identity lets React update the existing wheel in place.
              key={`digit-${position}`}
              digit={Number(character)}
              durationMs={durationMs}
            />
          );
        })}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
