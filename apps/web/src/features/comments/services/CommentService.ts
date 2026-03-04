import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import poolEn from '@/i18n/messages/en/commentVariants';
import poolHu from '@/i18n/messages/hu/commentVariants';
import i18nConfig from '@/root/i18n.config';
import type { CommentService as ICommentService } from '../types';
import { filterByDate } from './use-cases/filterByDate';
import {
  generateTree,
  type SeededCommentsOptions,
} from './use-cases/generateTree';

const pools: Record<AppLocale, typeof poolEn> = {
  en: poolEn,
  hu: poolHu,
};

@injectable()
export class CommentService implements ICommentService {
  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const pool =
      pools[item.locale as AppLocale] ?? pools[i18nConfig.defaultLocale];

    const data = generateTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
