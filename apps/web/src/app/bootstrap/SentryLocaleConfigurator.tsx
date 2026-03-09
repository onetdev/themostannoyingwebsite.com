'use client';

import * as Sentry from '@sentry/nextjs';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * A client component that configures the locale in Sentry for client-side reports.
 * This should be placed inside a NextIntlClientProvider to have access to the locale.
 */
export function SentryLocaleConfigurator() {
  const locale = useLocale();

  useEffect(() => {
    Sentry.setTag('locale', locale);
  }, [locale]);

  return null;
}
