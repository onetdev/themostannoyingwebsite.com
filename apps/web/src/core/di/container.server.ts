import type { Container } from 'inversify';
import { CommentService } from '@/features/comments/services';
import { DI as DIComments } from '@/features/comments/types';
import { ArticleService, AuthorService } from '@/features/content/services';
import { DI as DIContent } from '@/features/content/types';
import { OnlySpamsService } from '@/features/marketing/services';
import { DI as DIMarketing } from '@/features/marketing/types';
import { configureBaseContainer } from './container.base';

/**
 * Server container: the client-safe base plus bindings whose services
 * `import 'server-only'`.
 *
 * These services must never be registered in the browser container, which is
 * why the client and server containers intentionally differ.
 */
export function configureServerContainer(container: Container) {
  configureBaseContainer(container);

  container
    .bind(DIContent.ArticleService)
    .to(ArticleService)
    .inSingletonScope();
  container.bind(DIContent.AuthorService).to(AuthorService).inSingletonScope();
  container
    .bind(DIMarketing.OnlySpamsService)
    .to(OnlySpamsService)
    .inSingletonScope();
  container
    .bind(DIComments.CommentService)
    .to(CommentService)
    .inSingletonScope();
}
