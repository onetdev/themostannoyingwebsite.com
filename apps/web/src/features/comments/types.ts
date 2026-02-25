import { ArticleDatum } from '@maw/content-api';

import { Comment } from './schemas';
import { SeededCommentsOptions } from './services/use-cases/generateTree';

export const DI = {
  CommentService: Symbol.for('CommentService'),
};

export interface CommentService {
  getByArticle(
    item: ArticleDatum,
    options?: SeededCommentsOptions,
  ): Promise<Comment[]>;
}
