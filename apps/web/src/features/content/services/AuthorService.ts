import 'server-only';

import {
  type Author,
  type AuthorListItem,
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type GetAuthorListQueryParams,
  type LanguageCode,
} from '@maw/content-sdk';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';

import { DI, type AuthorService as IAuthorService } from '../types';

@injectable()
export class AuthorService implements IAuthorService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createAppContentClient();
  }

  public async getBySlug(
    slug: string,
    lang?: LanguageCode,
  ): Promise<Author | undefined> {
    try {
      return await this.client.authors.getBySlug(
        slug,
        lang ? { lang } : undefined,
        {
          next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.authors] },
        },
      );
    } catch (_err) {
      return undefined;
    }
  }

  public async listAll(
    params?: Omit<GetAuthorListQueryParams, 'limit' | 'offset'>,
  ): Promise<AuthorListItem[]> {
    return this.client.authors.listAll(params, {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.authors] },
    });
  }
}

export function getAuthorService(container: Container): IAuthorService {
  return container.get<IAuthorService>(DI.AuthorService);
}
