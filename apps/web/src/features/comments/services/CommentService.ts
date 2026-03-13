import 'server-only';
import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import enCommentVariants from '@/features/comments/i18n/en/variants';
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
  private async getRangomGeneratorPool(locale: string): Promise<CommentPool> {
    const safeLocale = (i18nConfig.locales as readonly string[]).includes(
      locale,
    )
      ? locale
      : i18nConfig.defaultLocale;

    const [commentVariantsModule, variantsModule] = await Promise.all([
      import(`@/features/comments/i18n/${safeLocale}/variants`).catch(
        () => enCommentVariants,
      ),
      import(`@/i18n/messages/${safeLocale}/variants`).catch(() => enVariants),
    ]);

    const comments = commentVariantsModule.default.comments;
    const names = variantsModule.default.names;

    return {
      comments,
      names,
    };
  }

  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const pool = await this.getRangomGeneratorPool(item.locale);

    const data = generateTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
