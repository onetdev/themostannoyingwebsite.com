import 'server-only';

import type {
  Article,
  ArticleListItem,
  ContentApiClient,
  LanguageCode,
} from '@maw/content-sdk';
import { injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { getVariantPool } from '@/features/content/services/get-variant-pool';
import i18nConfig from '@/root/i18n.config';
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
      getVariantPool<string>(this.client, lang, 'names'),
      getVariantPool<string>(this.client, lang, 'comments'),
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

    const data = generateTree(item.slug, new Date(item.published_at), {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
