import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  createContentClient,
  formatSearchHighlight,
  type LanguageCode,
  type ListArticlesQueryParams,
  type ListArticlesResponse,
  stripMarkdown,
} from '@maw/content-sdk';
import { type Container, injectable } from 'inversify';

import {
  type Article,
  type ArticleListItem,
  type ArticleSearchQuery,
  type ArticleSearchResult,
  DI,
  type ArticleService as IArticleService,
} from '../types';

@injectable()
export class ArticleService implements IArticleService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createContentClient();
  }

  public async getBySlug(
    slug: string,
    lang?: LanguageCode,
  ): Promise<Article | undefined> {
    try {
      return await this.client.articles.getBySlug(
        slug,
        lang ? { lang } : undefined,
        {
          next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
        },
      );
    } catch (_err) {
      return undefined;
    }
  }

  public async list(
    params?: ListArticlesQueryParams,
  ): Promise<ListArticlesResponse> {
    return this.client.articles.list(params, {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    });
  }

  public async listAll(
    params?: Omit<ListArticlesQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]> {
    return this.client.articles.listAll(params, {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    });
  }

  public async search(
    query: ArticleSearchQuery,
  ): Promise<ArticleSearchResult[]> {
    const take = query.paginate?.take ?? 20;
    const skip = query.paginate?.skip ?? 0;

    const response = await this.client.search.query(
      {
        q: query.params.query,
        lang: query.params.locale as LanguageCode | undefined,
        limit: take,
        offset: skip,
        type: 'article',
      },
      {
        next: { revalidate: 600, tags: [CONTENT_CACHE_TAGS.articles] },
      },
    );

    return response.items.map((item) => ({
      lookup: {
        slug: item.slug,
        locale: item.lang,
      },
      title: stripMarkdown(item.title),
      contextHighlight: formatSearchHighlight(item.excerpt),
    }));
  }
}

export async function getArticleService(container: Container) {
  return container.get<IArticleService>(DI.ArticleService);
}
