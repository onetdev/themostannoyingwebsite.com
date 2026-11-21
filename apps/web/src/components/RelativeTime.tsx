'use client';

import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import {
  formatRelativeTime,
  getRelativeTimeRefreshIntervalMs,
} from '@/core/i18n/format-relative-time';

export type RelativeTimeProps = {
  className?: string;
  date: Date | number | string;
};

// Browsers clamp `setTimeout` delays above `2^31 - 1` ms to zero, which would
// fire immediately. Long cadences (months, years) are capped and re-scheduled.
const MAX_TIMEOUT_MS = 2_147_483_647;

/**
 * Server-rendered label used before hydration.
 *
 * The relative label depends on the current time, so rendering it on the server
 * would change the cached HTML on every revalidation and turn every ISR refresh
 * into a billed write. An absolute date is stable for a given `date`/`locale`.
 */
function formatAbsoluteDate(date: Date | number | string, locale: string) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(value);
}

export function RelativeTime({ className, date }: RelativeTimeProps) {
  const locale = useLocale();
  const [now, setNow] = useState<number | null>(null);
  const fallback = useMemo(
    () => formatAbsoluteDate(date, locale),
    [date, locale],
  );

  useEffect(() => {
    setNow(Date.now());

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleNextTick = () => {
      const interval = Math.min(
        getRelativeTimeRefreshIntervalMs(date, Date.now()),
        MAX_TIMEOUT_MS,
      );

      timeoutId = setTimeout(() => {
        setNow(Date.now());
        scheduleNextTick();
      }, interval);
    };

    scheduleNextTick();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [date]);

  return (
    <time
      className={className}
      dateTime={new Date(date).toISOString()}
      suppressHydrationWarning
    >
      {now === null ? fallback : formatRelativeTime(date, now, locale)}
    </time>
  );
}
