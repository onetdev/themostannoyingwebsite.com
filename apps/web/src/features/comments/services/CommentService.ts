import 'server-only';

import type {
  Article,
  ArticleListItem,
  ContentApiClient,
  LanguageCode,
} from '@maw/content-sdk';
import { injectable } from 'inversify';
import { createAppContentClient } from '@/core/content';
import enCommentVariants from '@/features/comments/i18n/en/variants';
import { getVariantPool } from '@/features/content/services/get-variant-pool';
import enVariants from '@/i18n/messages/en/variants';
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

    const names = namesPool?.items;
    const comments = commentsPool?.items;

    if (names?.length && comments?.length) {
      return { names, comments };
    }

    // Fall back to bundled translations when the Content API is unavailable
    // or a pool is empty.
    const [commentVariantsModule, variantsModule] = await Promise.all([
      import(`@/features/comments/i18n/${safeLocale}/variants`).catch(
        () => enCommentVariants,
      ),
      import(`@/i18n/messages/${safeLocale}/variants`).catch(() => enVariants),
    ]);

    return {
      comments: comments?.length
        ? comments
        : commentVariantsModule.default.comments,
      names: names?.length ? names : variantsModule.default.names,
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
