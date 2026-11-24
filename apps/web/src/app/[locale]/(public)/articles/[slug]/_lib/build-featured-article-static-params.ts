import type { LanguageCode } from '@maw/content-sdk';

export type FeaturedArticleStaticParam = {
  slug: string;
  locale: string;
};

/** Minimal listing dependency needed to build featured article static params. */
export interface FeaturedArticleListingService {
  listAll(options: {
    lang: LanguageCode;
    is_featured: true;
  }): Promise<ReadonlyArray<{ slug: string }>>;
}

/**
 * Builds `(slug, locale)` pairs for featured articles only. The rest of the
 * article catalog stays on-demand so the build does not emit the full localized
 * matrix.
 */
export async function buildFeaturedArticleStaticParams(
  locales: readonly string[],
  articleService: FeaturedArticleListingService,
): Promise<FeaturedArticleStaticParam[]> {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const articles = await articleService.listAll({
        lang: locale as LanguageCode,
        is_featured: true,
      });

      return articles.map((article) => ({
        slug: article.slug,
        locale,
      }));
    }),
  );

  return perLocale.flat();
}
