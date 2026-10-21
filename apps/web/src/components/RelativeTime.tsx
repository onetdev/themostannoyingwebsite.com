'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
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

export function RelativeTime({ className, date }: RelativeTimeProps) {
  const locale = useLocale();
  const [now, setNow] = useState(() => Date.now());

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
      {formatRelativeTime(date, now, locale)}
    </time>
  );
}
