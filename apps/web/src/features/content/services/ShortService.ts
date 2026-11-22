import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type GetShortListQueryParams,
  type GetShortListResponse,
  type LanguageCode,
  type Short,
  type ShortListItem,
} from '@maw/content-sdk';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';

import { DI, type ShortService as IShortService } from '../types';

const PAGE_SIZE = 100;

const CACHE_OPTIONS = {
  next: {
    revalidate: 1800,
    tags: [CONTENT_CACHE_TAGS.shorts],
  },
};

function emptyShortList(
  params?: GetShortListQueryParams,
): GetShortListResponse {
  return {
    total: 0,
    limit: params?.limit ?? 0,
    offset: params?.offset ?? 0,
    items: [],
  };
}

/**
 * Server-side short-form content service.
 *
 * The shorts endpoint is newer than the rest of the Content API, so reads
 * degrade to empty results instead of throwing. This keeps pages that merely
 * *offer* shorts (home, author, search) renderable while the endpoint is
 * unavailable, and lets the dedicated player route decide between content and
 * a 404 on its own.
 */
@injectable()
export class ShortService implements IShortService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createAppContentClient();
  }

  public async getBySlug(
    slug: string,
    lang?: LanguageCode,
  ): Promise<Short | undefined> {
    try {
      return await this.client.shorts.getBySlug(
        slug,
        lang ? { lang } : undefined,
        CACHE_OPTIONS,
      );
    } catch (_err) {
      return undefined;
    }
  }

  public async list(
    params?: GetShortListQueryParams,
  ): Promise<GetShortListResponse> {
    try {
      return await this.client.shorts.list(params, CACHE_OPTIONS);
    } catch (_err) {
      return emptyShortList(params);
    }
  }

  public async listAll(
    params?: Omit<GetShortListQueryParams, 'limit' | 'offset'>,
  ): Promise<ShortListItem[]> {
    const items: ShortListItem[] = [];
    let offset = 0;

    try {
      while (true) {
        const response = await this.client.shorts.list(
          {
            ...(params as GetShortListQueryParams),
            limit: PAGE_SIZE,
            offset,
          },
          CACHE_OPTIONS,
        );

        items.push(...response.items);

        const isComplete =
          items.length >= response.total || response.items.length === 0;

        if (isComplete) {
          break;
        }

        offset += response.items.length;
      }

      return items;
    } catch (_err) {
      return [];
    }
  }
}

export function getShortService(container: Container): IShortService {
  return container.get<IShortService>(DI.ShortService);
}
