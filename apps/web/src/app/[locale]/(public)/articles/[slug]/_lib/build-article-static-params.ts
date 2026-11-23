import {
  buildLocalizedStaticParams,
  type LocalizedStaticParam,
} from '@/app/[locale]/(public)/_lib/build-localized-static-params';

export type ArticleStaticParam = LocalizedStaticParam;

/**
 * Builds the `(slug, locale)` pairs for every localized article.
 *
 * @see buildLocalizedStaticParams for the shared iteration.
 */
export const buildArticleStaticParams = buildLocalizedStaticParams;
