import ReactDOMServer from 'react-dom/server';
import slugify from 'slugify';

import { articles as articlesRaw } from '@/features/articles/data';
import { Article, ArticleStatic } from '@/types';

interface ArticleFilter {
  isHighlighted?: boolean;
  isOnCover?: boolean;
}

interface ArticleSort {
  date?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
}

const propFilterBool = (
  article: Article,
  prop: keyof Article,
  value?: boolean,
) => {
  return (
    article[prop] === value ||
    typeof value === 'undefined' ||
    (article[prop] === undefined && value !== true)
  );
};

// Normalize raw article data se we have many optional fields in there.
const articles = articlesRaw.map((article) => ({
  ...article,
  slug: slugify(article.title),
  url: `/articles/${slugify(article.title)}`,
  isHighlighted: article.isHighlighted ?? false,
  isOnCover: article.isOnCover ?? false,
}));

class ArticleService {
  public getAll(): Article[] {
    return articles;
  }

  public getAllFiltered(filter: ArticleFilter, sort?: ArticleSort): Article[] {
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

  public getBySlug(slug: string): Article | undefined {
    return articles.find((article) => article.slug === slug);
  }

  public getStatic(article: Article): ArticleStatic {
    return {
      ...article,
      body: ReactDOMServer.renderToString(article.body as React.ReactElement),
      date: article.date.toISOString(),
    };
  }
}

export const ArticleServiceSingleton = new ArticleService();
