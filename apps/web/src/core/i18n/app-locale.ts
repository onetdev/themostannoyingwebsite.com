import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from './routing';

/**
 * Narrows an arbitrary `[locale]` route segment to a supported app locale.
 *
 * The `[locale]` segment is dynamic, so unknown values (bot scans, stale links,
 * malformed paths) can reach a page before next-intl's request config runs.
 * Validate at the data-access boundary so an invalid locale can never be
 * forwarded to the Content API as `lang=` and echoed back as a validation
 * error (Sentry THEMOSTANNOYINGWEBSITE-B7 / -B9).
 */
export function assertAppLocale(value: string | undefined): AppLocale {
  if (!hasLocale(routing.locales, value)) {
    notFound();
  }

  return value;
}
