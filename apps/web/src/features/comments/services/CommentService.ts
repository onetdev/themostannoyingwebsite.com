import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import poolEn from '@/features/comments/i18n/generator/en';
import poolHu from '@/features/comments/i18n/generator/hu';
import poolZh from '@/features/comments/i18n/generator/zh';
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
  zh: poolZh,
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
