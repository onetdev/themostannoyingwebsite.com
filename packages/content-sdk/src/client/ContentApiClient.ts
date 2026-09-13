import { HttpTransport } from './http';
import { ArticlesResource } from './resources/articles';
import { HealthResource } from './resources/health';
import { ImagesResource } from './resources/images';
import { PagesResource } from './resources/pages';
import { TagsResource } from './resources/tags';
import type { ContentClientOptions } from './types';

export class ContentApiClient {
  readonly articles: ArticlesResource;
  readonly pages: PagesResource;
  readonly tags: TagsResource;
  readonly images: ImagesResource;
  readonly health: HealthResource;

  private readonly transport: HttpTransport;

  constructor(options?: ContentClientOptions) {
    this.transport = new HttpTransport(options);

    this.articles = new ArticlesResource(this.transport);
    this.pages = new PagesResource(this.transport);
    this.tags = new TagsResource(this.transport);
    this.images = new ImagesResource(this.transport);
    this.health = new HealthResource(this.transport);
  }
}

/**
 * Factory helper to instantiate ContentApiClient.
 */
export function createContentClient(
  options?: ContentClientOptions,
): ContentApiClient {
  return new ContentApiClient(options);
}
