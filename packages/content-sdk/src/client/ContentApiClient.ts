import { HttpTransport } from './http';
import { ArticlesResource } from './resources/articles';
import { HealthResource } from './resources/health';
import { ImagesResource } from './resources/images';
import { LocalesResource } from './resources/locales';
import { PagesResource } from './resources/pages';
import { SearchResource } from './resources/search';
import { TagsResource } from './resources/tags';
import { TranslationsResource } from './resources/translations';
import { VariantsResource } from './resources/variants';
import type { ContentClientOptions } from './types';

function resolveBaseUrl(baseUrl?: string): string | undefined {
  if (baseUrl) {
    return baseUrl;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NEXT_PUBLIC_CONTENT_API_URL || undefined;
  }
  return undefined;
}

export class ContentApiClient {
  readonly articles: ArticlesResource;
  readonly pages: PagesResource;
  readonly search: SearchResource;
  readonly tags: TagsResource;
  readonly images: ImagesResource;
  readonly health: HealthResource;
  readonly locales: LocalesResource;
  readonly translations: TranslationsResource;
  readonly variants: VariantsResource;

  private readonly transport: HttpTransport;

  constructor(options?: ContentClientOptions) {
    const resolvedBaseUrl = resolveBaseUrl(options?.baseUrl);
    this.transport = new HttpTransport({
      ...options,
      ...(resolvedBaseUrl ? { baseUrl: resolvedBaseUrl } : {}),
    });

    this.articles = new ArticlesResource(this.transport);
    this.pages = new PagesResource(this.transport);
    this.search = new SearchResource(this.transport);
    this.tags = new TagsResource(this.transport);
    this.images = new ImagesResource(this.transport);
    this.health = new HealthResource(this.transport);
    this.locales = new LocalesResource(this.transport);
    this.translations = new TranslationsResource(this.transport);
    this.variants = new VariantsResource(this.transport);
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
