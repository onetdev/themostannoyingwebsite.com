import { ArticleApiService } from '@maw/content-api';
import { type Container, injectable } from 'inversify';

import { DI, type ArticleApiService as IArticleApiService } from '../types';

@injectable()
export class ArticleService
  extends ArticleApiService
  implements IArticleApiService
{
  constructor() {
    super({
      getAssetUrl: (path: string) => `/assets/articles/${path}`,
      getUrl: (item) => `/articles/${item.slug}`,
    });
  }
}

export function getAppArticleService(container: Container) {
  return container.get<IArticleApiService>(DI.ArticleService);
}
