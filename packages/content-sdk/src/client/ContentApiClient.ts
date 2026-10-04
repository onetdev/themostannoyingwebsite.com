import { HttpTransport } from './http';
import { ArticlesResource } from './resources/articles';
import { AuthorsResource } from './resources/authors';
import { HealthResource } from './resources/health';
import { ImagesResource } from './resources/images';
import { LocalesResource } from './resources/locales';
import { NewsletterResource } from './resources/newsletter';
import { PagesResource } from './resources/pages';
import { PoolsResource } from './resources/pools';
import { PrizeWheelResource } from './resources/prize-wheel';
import { SearchResource } from './resources/search';
import { SpamSampleResource } from './resources/spam-sample';
import { SurveyResource } from './resources/survey';
import { TagsResource } from './resources/tags';
import { TranslationsResource } from './resources/translations';
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
  readonly authors: AuthorsResource;
  readonly pages: PagesResource;
  readonly search: SearchResource;
  readonly tags: TagsResource;
  readonly images: ImagesResource;
  readonly health: HealthResource;
  readonly locales: LocalesResource;
  readonly translations: TranslationsResource;
  readonly pools: PoolsResource;
  readonly survey: SurveyResource;
  readonly prizeWheel: PrizeWheelResource;
  readonly newsletter: NewsletterResource;
  readonly spamSample: SpamSampleResource;

  private readonly transport: HttpTransport;

  constructor(options?: ContentClientOptions) {
    const resolvedBaseUrl = resolveBaseUrl(options?.baseUrl);
    this.transport = new HttpTransport({
      ...options,
      ...(resolvedBaseUrl ? { baseUrl: resolvedBaseUrl } : {}),
    });

    this.articles = new ArticlesResource(this.transport);
    this.authors = new AuthorsResource(this.transport);
    this.pages = new PagesResource(this.transport);
    this.search = new SearchResource(this.transport);
    this.tags = new TagsResource(this.transport);
    this.images = new ImagesResource(this.transport);
    this.health = new HealthResource(this.transport);
    this.locales = new LocalesResource(this.transport);
    this.translations = new TranslationsResource(this.transport);
    this.pools = new PoolsResource(this.transport);
    this.survey = new SurveyResource(this.transport);
    this.prizeWheel = new PrizeWheelResource(this.transport);
    this.newsletter = new NewsletterResource(this.transport);
    this.spamSample = new SpamSampleResource(this.transport);
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
