import {
  ArticleData,
  ArticleDatum,
  ArticleFilter,
  ArticleLookupIdentifier,
  ArticleSearchFilter,
  ArticleSearchResult,
} from '@/features/articles';
import { ArticleIndexEntrySchema } from '@/lib/schemas/article-index-entry';
import { fuzzy_search } from '@/lib/utils/string';
import articlesRaw from '@/public/assets/articles/index.json';

export const defaultPageSize = 10;

/**
 * SUPER DUPER IMPORTANT!!!!
 * Don't throw stones, the whole article system is tiny and happens on the
 * frontend so it's not going to be optimized nor particularly fast.
 * It's going to get refactored.
 */

class ArticleService {
  articles: ArticleDatum[];

  constructor() {
    this.articles = articlesRaw.map(
      (article: ArticleIndexEntrySchema) =>
        ({
          assetGroupId: article.directory,
          content: article.content,
          coverImages: article.hasCoverImage
            ? {
                original: `/assets/articles/${article.directory}/cover.webp`,
                thumbnail: `/assets/articles/${article.directory}/cover-480x270.webp`,
              }
            : undefined,
          intro: article.intro,
          isHighlighted: article.isHighlighted,
          isOnCover: article.isOnCover,
          locale: article.locale,
          publishedAt: new Date(article.publishedAt),
          slug: article.slug,
          title: article.title,
          url: `/articles/${article.slug}`,
        }) satisfies ArticleDatum,
    );
  }

  public getByLookup(
    filter: ArticleLookupIdentifier,
  ): ArticleDatum | undefined {
    return this.articles.find(
      (article) =>
        article.slug === filter.slug && article.locale === filter.locale,
    );
  }

  public search({
    query,
    params,
    paginate,
  }: ArticleSearchFilter): ArticleSearchResult[] {
    const pool = this.getMany({
      params,
      paginate: { take: -1, skip: 0 },
    });

    return pool.items
      .map((article) => {
        const matchResult = fuzzy_search({
          text: article.content,
          query,
        });

        if (!matchResult) {
          return null;
        }

        return {
          ...matchResult,
          article,
        };
      })
      .filter((item) => item !== null)
      .sort((a, b) => b.stats.cumScore - a.stats.cumScore)
      .slice(paginate?.skip || 0, paginate?.take ?? defaultPageSize)
      .map((item) => ({
        lookup: {
          slug: item.article.slug,
          locale: item.article.locale,
        },
        title: item.article.title,
        contextHighlight: item.result,
      }));
  }

  public getMany({
    params,
    sort = { date: 'desc' },
    paginate,
  }: ArticleFilter): ArticleData {
    let results = this.articles.filter((article) => {
      return (
        (!params.locale || article.locale === params.locale) &&
        propFilterBool(article, 'isHighlighted', params.isHighlighted) &&
        propFilterBool(article, 'isOnCover', params.isOnCover)
      );
    });

    if (sort) {
      results = results.sort((a, b) => {
        const dateCmp = sort.date
          ? (a.publishedAt.getTime() - b.publishedAt.getTime()) *
            (sort.date === 'asc' ? 1 : -1)
          : 0;
        const titleCmp = sort.title
          ? a.title.localeCompare(b.title) * (sort.title === 'asc' ? 1 : -1)
          : 0;

        return dateCmp == 0 ? titleCmp : dateCmp;
      });
    }

    return {
      items: results.slice(
        paginate?.skip || 0,
        paginate?.take ?? defaultPageSize,
      ),
      total: results.length,
      take: paginate?.take ?? defaultPageSize,
      skip: paginate?.skip ?? 0,
    };
  }

  public getFirst({ params }: ArticleFilter): ArticleDatum | undefined {
    return this.getMany({ params, paginate: { take: 1, skip: 0 } })?.items[0];
  }
}

const propFilterBool = (
  article: ArticleDatum,
  prop: keyof ArticleDatum,
  value?: boolean,
) =>
  article[prop] === value ||
  typeof value === 'undefined' ||
  (article[prop] === undefined && value !== true);

export const ArticleServiceSingleton = new ArticleService();
