import type { LanguageCode } from '@maw/content-sdk';

export type ArticleStaticParam = {
  slug: string;
  locale: string;
};

/** Minimal listing dependency needed to build article static params. */
export interface ArticleListingService {
  listAll(options: {
    lang: LanguageCode;
  }): Promise<ReadonlyArray<{ slug: string }>>;
}

/**
 * Builds the `(slug, locale)` pairs for every localized article, fetching each
 * locale's listing in parallel. Extracted so the iteration is independently
 * testable (`generateStaticParams` is not exported for unit testing).
 */
export async function buildArticleStaticParams(
  locales: readonly string[],
  articleService: ArticleListingService,
): Promise<ArticleStaticParam[]> {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const articles = await articleService.listAll({
        lang: locale as LanguageCode,
      });

      return articles.map((article) => ({ slug: article.slug, locale }));
    }),
  );

  return perLocale.flat();
}
