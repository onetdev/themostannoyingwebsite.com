import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import poolAr from '@/features/comments/i18n/generator/ar';
import poolDe from '@/features/comments/i18n/generator/de';
import poolEn from '@/features/comments/i18n/generator/en';
import poolEs from '@/features/comments/i18n/generator/es';
import poolFr from '@/features/comments/i18n/generator/fr';
import poolHi from '@/features/comments/i18n/generator/hi';
import poolHu from '@/features/comments/i18n/generator/hu';
import poolIt from '@/features/comments/i18n/generator/it';
import poolJa from '@/features/comments/i18n/generator/ja';
import poolKo from '@/features/comments/i18n/generator/ko';
import poolPl from '@/features/comments/i18n/generator/pl';
import poolPt from '@/features/comments/i18n/generator/pt';
import poolRu from '@/features/comments/i18n/generator/ru';
import poolTr from '@/features/comments/i18n/generator/tr';
import poolZh from '@/features/comments/i18n/generator/zh';
import i18nConfig from '@/root/i18n.config';
import type { CommentService as ICommentService } from '../types';
import { filterByDate } from './use-cases/filterByDate';
import {
  generateTree,
  type SeededCommentsOptions,
} from './use-cases/generateTree';

const pools: Record<AppLocale, typeof poolEn> = {
  ar: poolAr,
  de: poolDe,
  en: poolEn,
  es: poolEs,
  fr: poolFr,
  hi: poolHi,
  hu: poolHu,
  it: poolIt,
  ja: poolJa,
  ko: poolKo,
  pl: poolPl,
  pt: poolPt,
  ru: poolRu,
  tr: poolTr,
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
