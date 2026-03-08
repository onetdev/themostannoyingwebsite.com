import type { ArticleDatum } from '@maw/content-api';
import type commentsEnLocale from './i18n/en';
import type { Comment } from './schemas';
import type { SeededCommentsOptions } from './services/use-cases/generateTree';

export const DI = {
  CommentService: Symbol.for('CommentService'),
};

export type CommentsI18nShape = typeof commentsEnLocale;

export interface CommentService {
  getByArticle(
    item: ArticleDatum,
    options?: SeededCommentsOptions,
  ): Promise<Comment[]>;
}
