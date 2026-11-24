import 'server-only';

import type {
  Article,
  ArticleListItem,
  ContentApiClient,
  LanguageCode,
  ShortVideoListItem,
} from '@maw/content-sdk';
import { injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { getContentPool } from '@/features/content/services/get-content-pool';
import i18nConfig from '@/root/i18n.config';
import type { Comment } from '../schemas';
import type { CommentService as ICommentService } from '../types';
import { filterByDate } from './use-cases/filterByDate';
import {
  generateTree,
  type SeededCommentsOptions,
} from './use-cases/generateTree';

interface CommentPool {
  names: string[];
  comments: string[];
}

@injectable()
export class CommentService implements ICommentService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createAppContentClient();
  }

  private async getRangomGeneratorPool(locale: string): Promise<CommentPool> {
    const safeLocale = (i18nConfig.locales as readonly string[]).includes(
      locale,
    )
      ? locale
      : i18nConfig.defaultLocale;
    const lang = safeLocale as LanguageCode;

    const [namesPool, commentsPool] = await Promise.all([
      getContentPool(this.client, lang, 'names'),
      getContentPool(this.client, lang, 'comments'),
    ]);

    return {
      names: namesPool?.items ?? [],
      comments: commentsPool?.items ?? [],
    };
  }

  async getByArticle(
    item: Article | ArticleListItem,
    options?: SeededCommentsOptions,
  ) {
    const pool = await this.getRangomGeneratorPool(item.lang);
    const now = Date.now();

    const data = generateTree(item.slug, new Date(item.published_at), {
      pool,
      ...(options ?? {}),
      now,
    });

    return filterByDate(data, now);
  }

  /**
   * Seeded comment threads for a short-video feed, keyed by short id.
   *
   * Short videos deliberately keep a single reply level: the player's comment
   * sheet is compact, and deeper threads would not fit the surface.
   */
  async getByShortVideos(
    items: ReadonlyArray<
      Pick<ShortVideoListItem, 'id' | 'slug' | 'lang' | 'published_at'>
    >,
  ) {
    const now = Date.now();
    const pools = new Map<string, CommentPool>();
    const result: Record<string, Comment[]> = {};

    for (const item of items) {
      let pool = pools.get(item.lang);

      if (!pool) {
        pool = await this.getRangomGeneratorPool(item.lang);
        pools.set(item.lang, pool);
      }

      const data = generateTree(item.slug, new Date(item.published_at), {
        pool,
        now,
        maxDepth: 1,
        rootCount: 6,
        maxReplies: 2,
        maxTotalNodes: 18,
      });

      result[item.id] = filterByDate(data, now);
    }

    return result;
  }
}
