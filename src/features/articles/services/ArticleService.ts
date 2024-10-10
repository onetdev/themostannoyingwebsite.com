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

// Normalize raw article data se we have many optional fields in there.
const articles = articlesRaw.map(
  (article: ArticleMetaIndex) =>
    ({
      ...article,
      date: new Date(article.dateTime),
      slug: slugify(article.title),
      url: `/articles/${slugify(article.title)}`,
      id: article.directory,
    }) satisfies ArticleMeta,
);

class ArticleService {
  public getMeta(filter: ArticleLookupFilter): ArticleMeta | undefined {
    return articles.find(
      (article) =>
        article.slug === filter.slug && article.locale === filter.locale,
    );
  }

  public async getContent(
    filter: ArticleLookupFilter,
  ): Promise<ArticleContent | undefined> {
    try {
      const meta = this.getMeta(filter);
      return (await import(`@/public/articles/${meta?.id}/content.html`))
        .default;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public getAllFiltered(
    filter: ArticleFilter,
    sort?: ArticleSort,
  ): ArticleMeta[] {
    const results = articles.filter((article) => {
      return (
        propFilterBool(article, 'isHighlighted', filter.isHighlighted) &&
        propFilterBool(article, 'isOnCover', filter.isOnCover)
      );
    });

    if (sort) {
      return results.sort((a, b) => {
        const dateCmp = sort.date
          ? a.date.getTime() - b.date.getTime() * (sort.date === 'asc' ? 1 : -1)
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
