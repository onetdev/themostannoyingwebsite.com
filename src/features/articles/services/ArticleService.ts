import slugify from 'slugify';

import {
  ArticleData,
  ArticleFilter,
  ArticleLookupFilter,
} from '@/features/articles/types';
import articlesRaw from '@/public/articles/index.json';
import { ArticleIndexEntrySchema } from '@/root/src/schemas/article-index-entry';

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
      (article: ArticleIndexEntrySchema) =>
        ({
          assetGroupId: article.directory,
          content: article.content,
          coverImages: article.hasCoverImage
            ? {
                original: `/articles/${article.directory}/cover.jpg`,
                thumbnail: `/articles/${article.directory}/cover-480x270.jpg`,
              }
            : undefined,
          intro: article.intro,
          isHighlighted: article.isHighlighted,
          isOnCover: article.isOnCover,
          locale: article.locale,
          publishedAt: new Date(article.publishedAt),
          slug: slugify(article.title),
          title: article.title,
          url: `/articles/${slugify(article.title)}`,
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

  public getAllFiltered({
    props,
    sort,
    paginate,
  }: ArticleFilter): ArticleData[] {
    const results = this.articles.filter((article) => {
      return (
        propFilterBool(article, 'isHighlighted', props.isHighlighted) &&
        propFilterBool(article, 'isOnCover', props.isOnCover)
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

    return results.slice(paginate?.skip || 0, paginate?.take ?? 10);
  }

  public getFirstFiltered({ props }: ArticleFilter): ArticleData | undefined {
    return this.getAllFiltered({ props, paginate: { take: 1, skip: 0 } })[0];
  }
}

export const ArticleServiceSingleton = new ArticleService();
