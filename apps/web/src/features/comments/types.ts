import type { Article, ArticleListItem } from '@maw/content-sdk';
import type commentsEnLocale from './i18n/en';
import type { Comment } from './schemas';
import type { SeededCommentsOptions } from './services/use-cases/generateTree';

export const DI = {
  CommentService: Symbol.for('CommentService'),
};

export type CommentsI18nShape = typeof commentsEnLocale;

export interface CommentService {
  getByArticle(
    item: Article | ArticleListItem,
    options?: SeededCommentsOptions,
  ): Promise<Comment[]>;
}
