import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  createContentClient,
  createSearchSnippet,
  type LanguageCode,
  renderMarkdown,
  toCoverImages,
} from '@maw/content-sdk';
import { type Container, injectable } from 'inversify';

import {
  type ArticleData,
  type ArticleDatum,
  type ArticleLookupQuery,
  type ArticleQuery,
  type ArticleSearchQuery,
  type ArticleSearchResult,
  DI,
  type ArticleService as IArticleService,
} from '../types';

@injectable()
export class ArticleService implements IArticleService {
  private readonly client: ContentApiClient;

  constructor(...args: [ContentApiClient?]) {
    this.client = args[0] ?? createContentClient();
  }

  private mapToDatum(item: {
    id: string;
    article_group: string;
    slug: string;
    lang: string;
    title: string;
    summary: string;
    content: string;
    published_at: string;
    is_featured: boolean;
    reading_time_minutes?: number;
    featured_image?: unknown;
    tags?: string[];
    keywords?: string[];
    translations?: { lang: string; slug: string; title: string }[];
  }): ArticleDatum {
    return {
      assetGroupId: item.article_group,
      content: renderMarkdown(item.content),
      coverImages: toCoverImages(item.featured_image as never),
      id: item.id,
      intro: item.summary,
      isOnCover: item.is_featured,
      locale: item.lang,
      publishedAt: new Date(item.published_at),
      slug: item.slug,
      title: item.title,
      url: `/articles/${item.slug}`,
      readingTimeMinutes: item.reading_time_minutes,
      tags: item.tags,
      keywords: item.keywords,
      translations: item.translations,
    };
  }

  public async getByLookup(
    filter: ArticleLookupQuery,
  ): Promise<ArticleDatum | undefined> {
    const requestOptions = {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    };

    if (filter.slug) {
      try {
        const item = await this.client.articles.getBySlug(
          filter.slug,
          filter.locale ? { lang: filter.locale as LanguageCode } : undefined,
          requestOptions,
        );
        const datum = this.mapToDatum(item);
        if (
          filter.isOnCover !== undefined &&
          datum.isOnCover !== filter.isOnCover
        ) {
          return undefined;
        }
        return datum;
      } catch (_err) {
        // If not found by slug, fall back to querying
      }
    }

    const listResponse = await this.getMany({
      params: filter,
      paginate: { take: 1, skip: 0 },
    });

    return listResponse.items[0];
  }

  public async getById(
    id: string | number,
    locale?: string,
  ): Promise<ArticleDatum | undefined> {
    return this.getByLookup({ id: id.toString(), locale });
  }

  public async getMany({
    params,
    sort = { date: 'desc' },
    paginate,
  }: ArticleQuery): Promise<ArticleData> {
    const take = paginate?.take ?? 10;
    const skip = paginate?.skip ?? 0;
    const requestOptions = {
      next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
    };

    if (take === -1) {
      const items = await this.client.articles.listAll(
        {
          lang: params?.locale as LanguageCode | undefined,
          is_featured: params?.isOnCover,
        },
        requestOptions,
      );

      let results = items.map((i) => this.mapToDatum(i));

      if (params?.id) {
        results = results.filter(
          (r) => r.id === params.id || r.assetGroupId === params.id,
        );
      }
      if (params?.slug) {
        results = results.filter((r) => r.slug === params.slug);
      }

      if (sort?.date) {
        results.sort(
          (a, b) =>
            (a.publishedAt.getTime() - b.publishedAt.getTime()) *
            (sort.date === 'asc' ? 1 : -1),
        );
      }

      return {
        items: results.slice(skip),
        total: results.length,
        take,
        skip,
      };
    }

    const response = await this.client.articles.list(
      {
        lang: params?.locale as LanguageCode | undefined,
        is_featured: params?.isOnCover,
        limit: take,
        offset: skip,
      },
      requestOptions,
    );

    let items = response.items.map((i) => this.mapToDatum(i));

    if (params?.id) {
      items = items.filter(
        (r) => r.id === params.id || r.assetGroupId === params.id,
      );
    }
    if (params?.slug) {
      items = items.filter((r) => r.slug === params.slug);
    }

    return {
      items,
      total: response.total,
      take,
      skip,
    };
  }

  public async getFirst(
    query: ArticleQuery,
  ): Promise<ArticleDatum | undefined> {
    const results = await this.getMany({
      ...query,
      paginate: { take: 1, skip: 0 },
    });
    return results.items[0];
  }

  public async search(
    query: ArticleSearchQuery,
  ): Promise<ArticleSearchResult[]> {
    const take = query.paginate?.take ?? 20;
    const skip = query.paginate?.skip ?? 0;

    const response = await this.client.articles.list(
      {
        q: query.params.query,
        lang: query.params.locale as LanguageCode | undefined,
        limit: take,
        offset: skip,
      },
      {
        next: { revalidate: 600, tags: [CONTENT_CACHE_TAGS.articles] },
      },
    );

    return response.items.map((item) => ({
      lookup: {
        slug: item.slug,
        locale: item.lang,
      },
      title: item.title,
      contextHighlight: createSearchSnippet(item.content, query.params.query),
    }));
  }

  public async getAll(locale?: string): Promise<ArticleDatum[]> {
    const items = await this.client.articles.listAll(
      {
        lang: locale as LanguageCode | undefined,
      },
      {
        next: { revalidate: 1800, tags: [CONTENT_CACHE_TAGS.articles] },
      },
    );

    return items.map((i) => this.mapToDatum(i));
  }
}

export async function getArticleService(container: Container) {
  return container.get<IArticleService>(DI.ArticleService);
}
