import 'server-only';

import {
  type Article,
  type ArticleListItem,
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  createContentClient,
  type GetArticleListQueryParams,
  type GetArticleListResponse,
  type LanguageCode,
} from '@maw/content-sdk';
import { type Container, injectable } from 'inversify';

import { DI, type ArticleService as IArticleService } from '../types';

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
    params?: GetArticleListQueryParams,
  ): Promise<GetArticleListResponse> {
    return this.client.articles.list(params, {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    });
  }

  public async listAll(
    params?: Omit<GetArticleListQueryParams, 'limit' | 'offset'>,
  ): Promise<ArticleListItem[]> {
    return this.client.articles.listAll(params, {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    });
  }
}

export async function getArticleService(container: Container) {
  return container.get<IArticleService>(DI.ArticleService);
}
