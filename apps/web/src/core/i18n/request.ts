import { getLogger } from '@maw/logger';
import * as Sentry from '@sentry/nextjs';
import * as rootParams from 'next/root-params';
import { getRequestConfig } from 'next-intl/server';

import { assertAppLocale } from './app-locale';
import { loadMessages } from './load-messages';

const logger = getLogger().getSubLogger({ name: 'i18n' });

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  // Resolve the `[locale]` segment via `next/root-params` so the locale is
  // available to every Server Component (and stays statically renderable).
  // `setRequestLocale` is deprecated in the installed next-intl in favor of
  // this; verify in `node_modules/next-intl`. Always validate (even when
  // next-intl supplies an explicit locale) so unknown segments 404 instead of
  // reaching the Content API.
  const locale = assertAppLocale(explicitLocale ?? (await rootParams.locale()));

  Sentry.setTag('locale', locale);

  return {
    locale,
    messages: await loadMessages(
      locale,
      undefined,
      (error) => {
        logger.warn(
          `Failed to load '${locale}' translations from the Content API; falling back to English.`,
        );
        Sentry.captureException(error, {
          tags: { scope: 'i18n.load-messages', locale },
        });
      },
      (keys) => {
        logger.warn(
          `Ignored invalid rich-text translations for '${locale}': ${keys.join(', ')}`,
        );
        Sentry.captureException(
          new Error(
            `Invalid rich-text markup in '${locale}' translations: ${keys.join(', ')}`,
          ),
          {
            tags: {
              scope: 'i18n.invalid-messages',
              locale,
            },
          },
        );
      },
    ),
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
