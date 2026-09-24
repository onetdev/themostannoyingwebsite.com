import * as Sentry from '@sentry/nextjs';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { loadMessages } from './load-messages';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  Sentry.setTag('locale', locale);

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
