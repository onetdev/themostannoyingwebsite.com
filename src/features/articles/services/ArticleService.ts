import slugify from 'slugify';

import {
  ArticleData,
  ArticleFilter,
  ArticleIndexData,
  ArticleLookupFilter,
  ArticleSort,
} from '@/features/articles/types';
import articlesRaw from '@/public/articles/index.json';

const propFilterBool = (
  article: ArticleData,
  prop: keyof ArticleData,
  value?: boolean,
) =>
  article[prop] === value ||
  typeof value === 'undefined' ||
  (article[prop] === undefined && value !== true);

class ArticleService {
  articles: ArticleData[];

  constructor() {
    this.articles = articlesRaw.map(
      (article: ArticleIndexData) =>
        ({
          ...article,
          publishedAt: new Date(article.publishedAt),
          slug: slugify(article.title),
          url: `/articles/${slugify(article.title)}`,
          assetGroupId: article.directory,
        }) satisfies ArticleData,
    );
  }

  public getByLookupFilter(
    filter: ArticleLookupFilter,
  ): ArticleData | undefined {
    return this.articles.find(
      (article) =>
        article.slug === filter.slug && article.locale === filter.locale,
    );
  }

  public getAllFiltered(
    filter: ArticleFilter,
    sort?: ArticleSort,
    pagination: { take: number; skip: number } = { take: 15, skip: 0 },
  ): ArticleData[] {
    const results = this.articles.filter((article) => {
      return (
        propFilterBool(article, 'isHighlighted', filter.isHighlighted) &&
        propFilterBool(article, 'isOnCover', filter.isOnCover)
      );
    });

    if (sort) {
      return results.sort((a, b) => {
        const dateCmp = sort.date
          ? a.publishedAt.getTime() -
            b.publishedAt.getTime() * (sort.date === 'asc' ? 1 : -1)
          : 0;
        const titleCmp = sort.title
          ? a.title.localeCompare(b.title) * (sort.title === 'asc' ? 1 : -1)
          : 0;

        return dateCmp == 0 ? titleCmp : dateCmp;
      });
    }

    return results.slice(pagination.skip, pagination.take ?? results.length);
  }
}

export const ArticleServiceSingleton = new ArticleService();
