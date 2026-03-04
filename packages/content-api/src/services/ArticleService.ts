import { fuzzy_search } from '@maw/utils/string';

import articlesRaw from '../../data/index.json';
import type { ArticleIndexEntrySchema } from '../schemas/article-index-entry';
import type {
  ArticleData,
  ArticleDatum,
  ArticleFilter,
  ArticleLookupFilter,
  ArticleSearchFilter,
  ArticleSearchResult,
} from '../types';

export const defaultPageSize = 10;

type ArticleServiceProps = {
  getAssetUrl: (path: string) => string;
  getUrl: (item: ArticleIndexEntrySchema) => string;
};

/**
 * SUPER DUPER IMPORTANT!!!!
 * Don't throw stones, the whole article system is tiny and happens on the
 * frontend so it's not going to be optimized nor particularly fast.
 * It's going to get refactored.
 */

export class ArticleService {
  articles: ArticleDatum[];

  constructor({ getAssetUrl, getUrl }: ArticleServiceProps) {
    this.articles = articlesRaw.map((article: ArticleIndexEntrySchema) =>
      mapIndexEntryToContent(article, getAssetUrl, getUrl),
    );
  }

  public async getByLookup(
    filter: ArticleLookupFilter,
  ): Promise<ArticleDatum | undefined> {
    return this.articles.find((article) => isArticleMatching(article, filter));
  }

  public async getById(
    id: string | number,
    locale?: string,
  ): Promise<ArticleDatum | undefined> {
    return this.getByLookup({ id: id.toString(), locale });
  }

  public async search({
    query,
    params,
    paginate,
  }: ArticleSearchFilter): Promise<ArticleSearchResult[]> {
    const take = paginate?.take ?? defaultPageSize;
    const skip = paginate?.skip || 0;

    const pool = await this.getMany({
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
      .slice(skip, take === -1 ? undefined : skip + take)
      .map((item) => ({
        lookup: {
          slug: item.article.slug,
          locale: item.article.locale,
        },
        title: item.article.title,
        contextHighlight: item.result,
      }));
  }

  public async getMany({
    params,
    sort = { date: 'desc' },
    paginate,
  }: ArticleFilter): Promise<ArticleData> {
    const take = paginate?.take ?? defaultPageSize;
    const skip = paginate?.skip || 0;
    let results = this.articles.filter((article) =>
      isArticleMatching(article, params),
    );

    if (sort) {
      results = results.sort((a, b) => {
        const dateCmp = sort.date
          ? (a.publishedAt.getTime() - b.publishedAt.getTime()) *
            (sort.date === 'asc' ? 1 : -1)
          : 0;
        const titleCmp = sort.title
          ? a.title.localeCompare(b.title) * (sort.title === 'asc' ? 1 : -1)
          : 0;

        return dateCmp === 0 ? titleCmp : dateCmp;
      });
    }

    return {
      items: results.slice(skip, take === -1 ? undefined : skip + take),
      total: results.length,
      take,
      skip,
    };
  }

  public async getFirst({
    params,
  }: ArticleFilter): Promise<ArticleDatum | undefined> {
    const results = await this.getMany({
      params,
      paginate: { take: 1, skip: 0 },
    });
    return results?.items[0];
  }
}

const propBoolCheck = (
  article: ArticleDatum,
  prop: keyof ArticleDatum,
  value?: boolean,
) =>
  typeof value === 'undefined' ||
  article[prop] === value ||
  (article[prop] === undefined && value !== true);

const mapIndexEntryToContent = (
  article: ArticleIndexEntrySchema,
  getAssetUrl: (path: string) => string,
  getUrl: (item: ArticleIndexEntrySchema) => string,
) => {
  let coverImages: ArticleDatum['coverImages'];
  if (article.coverImage) {
    const thumbnail = getAssetUrl(
      `${article.coverImage.replace(/\.[^/.]+$/, '')}-480x270.gen.webp`,
    );
    coverImages = {
      original: getAssetUrl(article.coverImage),
      thumbnail,
    };
  }

  return {
    assetGroupId: article.directory,
    content: article.content,
    coverImages,
    id: article.id,
    intro: article.intro,
    isHighlighted: article.isHighlighted,
    isOnCover: article.isOnCover,
    locale: article.locale,
    publishedAt: new Date(article.publishedAt),
    slug: article.slug,
    title: article.title,
    url: getUrl(article),
  } satisfies ArticleDatum;
};

const isArticleMatching = (
  article: ArticleDatum,
  filter: ArticleLookupFilter,
) => {
  return (
    (!filter.locale || article.locale === filter.locale) &&
    (!filter.id || article.id === filter.id) &&
    (!filter.slug || article.slug === filter.slug) &&
    propBoolCheck(article, 'isHighlighted', filter.isHighlighted) &&
    propBoolCheck(article, 'isOnCover', filter.isOnCover)
  );
};
