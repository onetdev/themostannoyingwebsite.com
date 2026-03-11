import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import enComments from '@/features/comments/i18n/generator/en';
import enVariants from '@/i18n/messages/variants/en';
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
  private async getPool(locale: string): Promise<CommentPool> {
    const safeLocale = (i18nConfig.locales as readonly string[]).includes(
      locale,
    )
      ? locale
      : i18nConfig.defaultLocale;

    const [poolModule, variantsModule] = await Promise.all([
      import(`@/features/comments/i18n/generator/${safeLocale}`).catch(
        () => enComments,
      ),
      import(`@/i18n/messages/variants/${safeLocale}`).catch(() => enVariants),
    ]);

    const pool = poolModule.default;
    const names =
      variantsModule.default.names.length > 0
        ? variantsModule.default.names
        : pool.names;

    return {
      ...pool,
      names,
    };
  }

  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const pool = await this.getPool(item.locale);

    const data = generateTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
