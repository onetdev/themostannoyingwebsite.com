import { ArticleDatum } from '@maw/content-api';

import { filterByDate } from './use-cases/filterByDate';
import { generateTree, SeededCommentsOptions } from './use-cases/generateTree';

import pool from '@/i18n/messages/en/commentVariants';

export class CommentService {
  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const data = generateTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
