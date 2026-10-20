'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { formatRelativeTime } from '@/core/i18n/format-relative-time';

const REFRESH_INTERVAL_MS = 60_000;

export type RelativeTimeProps = {
  className?: string;
  date: Date | number | string;
};

export function RelativeTime({ className, date }: RelativeTimeProps) {
  const locale = useLocale();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(interval);
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
