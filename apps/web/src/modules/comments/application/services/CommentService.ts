import { ArticleDatum } from '@maw/content-api';

import {
  filterFutureComments,
  generateCommentTree,
  SeededCommentsOptions,
} from './commentTreeGenerator';

import pool from '@/i18n/messages/en/commentVariants';

export class CommentService {
  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const data = generateCommentTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterFutureComments(data, Date.now());
  }
}
