import type { LanguageCode } from '@maw/content-sdk';

export interface LocalizedStaticParam {
  slug: string;
  locale: string;
}

/** Minimal listing dependency needed to build localized static params. */
export interface LocalizedListingService {
  listAll(options: {
    lang: LanguageCode;
  }): Promise<ReadonlyArray<{ slug: string }>>;
}

/**
 * Builds the `(slug, locale)` pairs for every localized resource, fetching each
 * locale's listing in parallel. Extracted so the iteration is independently
 * testable (`generateStaticParams` is not exported for unit testing).
 */
export async function buildLocalizedStaticParams(
  locales: readonly string[],
  service: LocalizedListingService,
): Promise<LocalizedStaticParam[]> {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const items = await service.listAll({
        lang: locale as LanguageCode,
      });

      return items.map((item) => ({ slug: item.slug, locale }));
    }),
  );

  return perLocale.flat();
}
