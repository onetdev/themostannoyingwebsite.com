import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type GetShortVideoListQueryParams,
  type GetShortVideoListResponse,
  type LanguageCode,
  type ShortVideo,
  type ShortVideoListItem,
} from '@maw/content-sdk';
import { getLogger } from '@maw/logger';
import { type Container, injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';

import { DI, type ShortVideoService as IShortVideoService } from '../types';

const PAGE_SIZE = 100;

const CACHE_OPTIONS = {
  next: {
    revalidate: 1800,
    tags: [CONTENT_CACHE_TAGS.shorts],
  },
};

function emptyShortVideoList(
  params?: GetShortVideoListQueryParams,
): GetShortVideoListResponse {
  return {
    total: 0,
    limit: params?.limit ?? 0,
    offset: params?.offset ?? 0,
    items: [],
  };
}

/**
 * Server-side short video content service.
 *
 * Reads degrade to empty results instead of throwing, so pages that merely
 * *offer* short videos (home, author, search) stay renderable while the
 * endpoint is unavailable. The dedicated player route decides between content
 * and a 404 on its own.
 */
@injectable()
export class ShortVideoService implements IShortVideoService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createAppContentClient();
  }

  public async getBySlug(
    slug: string,
    lang?: LanguageCode,
  ): Promise<ShortVideo | undefined> {
    try {
      return await this.client.shortVideos.getBySlug(
        slug,
        lang ? { lang } : undefined,
        CACHE_OPTIONS,
      );
    } catch (err) {
      getLogger().debug('Short video detail request failed', {
        slug,
        lang,
        error: err,
      });
      return undefined;
    }
  }

  public async list(
    params?: GetShortVideoListQueryParams,
  ): Promise<GetShortVideoListResponse> {
    try {
      return await this.client.shortVideos.list(params, CACHE_OPTIONS);
    } catch (err) {
      getLogger().debug('Short video list request failed', {
        params,
        error: err,
      });
      return emptyShortVideoList(params);
    }
  }

  public async listAll(
    params?: Omit<GetShortVideoListQueryParams, 'limit' | 'offset'>,
  ): Promise<ShortVideoListItem[]> {
    const items: ShortVideoListItem[] = [];
    let offset = 0;

    while (true) {
      let response: GetShortVideoListResponse;

      try {
        response = await this.client.shortVideos.list(
          {
            ...(params as GetShortVideoListQueryParams),
            limit: PAGE_SIZE,
            offset,
          },
          CACHE_OPTIONS,
        );
      } catch (err) {
        // A partially collected feed is still usable, so a failing page ends
        // the pagination instead of discarding the pages already fetched.
        getLogger().debug('Short video list page request failed', {
          params,
          offset,
          error: err,
        });
        break;
      }

      items.push(...response.items);

      const isComplete =
        items.length >= response.total || response.items.length === 0;

      if (isComplete) {
        break;
      }

      offset += response.items.length;
    }

    return items;
  }
}

export function getShortVideoService(container: Container): IShortVideoService {
  return container.get<IShortVideoService>(DI.ShortVideoService);
}
