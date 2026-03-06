import type { ArticleDatum } from '@maw/content-api';

import type { Comment } from './schemas';
import type { SeededCommentsOptions } from './services/use-cases/generateTree';

export const DI = {
  CommentService: Symbol.for('CommentService'),
};

export interface CommentService {
  getByArticle(
    item: ArticleDatum,
    options?: SeededCommentsOptions,
  ): Promise<Comment[]>;
}
