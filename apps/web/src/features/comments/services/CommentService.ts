import type { ArticleDatum } from '@maw/content-api';
import { injectable } from 'inversify';
import pool from '@/i18n/messages/en/commentVariants';
import type { CommentService as ICommentService } from '../types';
import { filterByDate } from './use-cases/filterByDate';
import {
  generateTree,
  type SeededCommentsOptions,
} from './use-cases/generateTree';

@injectable()
export class CommentService implements ICommentService {
  async getByArticle(item: ArticleDatum, options?: SeededCommentsOptions) {
    const data = generateTree(item.slug, item.publishedAt, {
      pool,
      ...(options ?? {}),
    });

    return filterByDate(data, Date.now());
  }
}
