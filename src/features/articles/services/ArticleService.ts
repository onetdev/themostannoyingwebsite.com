import slugify from 'slugify';

import {
  ArticleContent,
  ArticleFilter,
  ArticleLookupFilter,
  ArticleMeta,
  ArticleMetaIndex,
  ArticleSort,
} from '@/features/articles/types';
import articlesRaw from '@/public/articles/index.json';

const propFilterBool = (
  article: ArticleMeta,
  prop: keyof ArticleMeta,
  value?: boolean,
) =>
  article[prop] === value ||
  typeof value === 'undefined' ||
  (article[prop] === undefined && value !== true);

class ArticleService {
  articles: ArticleMeta[];

  constructor() {
    this.articles = articlesRaw.map(
      (article: ArticleMetaIndex) =>
        ({
          ...article,
          dateTime: new Date(article.dateTime),
          slug: slugify(article.title),
          url: `/articles/${slugify(article.title)}`,
          id: article.directory,
        }) satisfies ArticleMeta,
    );
  }

  public getMeta(filter: ArticleLookupFilter): ArticleMeta | undefined {
    return this.articles.find(
      (article) =>
        article.slug === filter.slug && article.locale === filter.locale,
    );
  }

  async getContentById(id: string): Promise<ArticleContent | undefined> {
    try {
      const isBrowser = typeof window !== 'undefined';
      const contentPath = `/articles/${id}/content.html`;
      if (isBrowser) {
        return await fetch(contentPath).then((res) => res.text());
      } else {
        const fs = await import('fs/promises');
        return await fs
          .readFile(process.cwd() + contentPath)
          .then((res) => res.toString());
      }
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async getContent(
    filter: ArticleLookupFilter,
  ): Promise<ArticleContent | undefined> {
    try {
      const meta = this.getMeta(filter);
      if (!meta) {
        return undefined;
      }

      return await this.getContentById(meta?.id);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public getAllFiltered(
    filter: ArticleFilter,
    sort?: ArticleSort,
  ): ArticleMeta[] {
    const results = this.articles.filter((article) => {
      return (
        propFilterBool(article, 'isHighlighted', filter.isHighlighted) &&
        propFilterBool(article, 'isOnCover', filter.isOnCover)
      );
    });

    if (sort) {
      return results.sort((a, b) => {
        const dateCmp = sort.date
          ? a.dateTime.getTime() -
            b.dateTime.getTime() * (sort.date === 'asc' ? 1 : -1)
          : 0;
        const titleCmp = sort.title
          ? a.title.localeCompare(b.title) * (sort.title === 'asc' ? 1 : -1)
          : 0;

        return dateCmp == 0 ? titleCmp : dateCmp;
      });
    }

    return results;
  }
}

export const ArticleServiceSingleton = new ArticleService();
