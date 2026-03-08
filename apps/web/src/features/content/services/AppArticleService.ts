import { ArticleService as ArticleServiceBase } from '@maw/content-api';
import { type Container, injectable } from 'inversify';

import { DI, type ArticleService as IArticleService } from '../types';

@injectable()
export class AppArticleService
  extends ArticleServiceBase
  implements IArticleService
{
  constructor() {
    super({
      getAssetUrl: (path: string) => `/assets/articles/${path}`,
      getUrl: (item) => `/articles/${item.slug}`,
    });
  }
}

export function getAppArticleService(container: Container) {
  return container.get<IArticleService>(DI.AppArticleService);
}
