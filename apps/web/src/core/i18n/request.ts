import { getLogger } from '@maw/logger';
import * as Sentry from '@sentry/nextjs';
import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { loadMessages } from './load-messages';
import { routing } from './routing';

const logger = getLogger().getSubLogger({ name: 'i18n' });

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  let locale = explicitLocale as AppLocale | undefined;

  // Read the `[locale]` segment via `next/root-params` so the locale is
  // available to every Server Component (and stays statically renderable).
  // `setRequestLocale` is deprecated in the installed next-intl in favor of
  // this; verify in `node_modules/next-intl`.
  if (!locale) {
    const paramValue = await rootParams.locale();

    if (!hasLocale(routing.locales, paramValue)) {
      notFound();
    }

    locale = paramValue;
  }

  Sentry.setTag('locale', locale);

  return {
    locale,
    messages: await loadMessages(locale, undefined, (error) => {
      logger.warn(
        `Failed to load '${locale}' translations from the Content API; falling back to English.`,
      );
      Sentry.captureException(error, {
        tags: { scope: 'i18n.load-messages', locale },
      });
    }),
    onError: (error) => {
      // Missing keys, malformed ICU and rich-text errors from the remote
      // bundle would otherwise only surface in server logs. Keep local
      // visibility in development without flooding production build logs.
      Sentry.captureException(error, {
        tags: { scope: 'i18n.message', locale },
      });
      if (process.env.NODE_ENV !== 'production') {
        logger.warn(error);
      }
    },
  };
});
