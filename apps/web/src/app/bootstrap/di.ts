import type { Container } from 'inversify';
import { CommentService } from '@/features/comments/services';
import { ArticleService } from '@/features/content/services';
import { OnlySpamsService } from '@/features/marketing/services';
import { configureCommonContainer, Symbols } from './di.common';

export { Symbols };

export function configureContainer(container: Container) {
  configureCommonContainer(container);

  container.bind(Symbols.ArticleService).to(ArticleService).inSingletonScope();
  container
    .bind(Symbols.OnlySpamsService)
    .to(OnlySpamsService)
    .inSingletonScope();
  container.bind(Symbols.CommentService).to(CommentService).inSingletonScope();
}
