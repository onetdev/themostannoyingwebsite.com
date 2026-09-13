import 'reflect-metadata';

import type { ContentApiClient } from '@maw/content-sdk';
import { Container } from 'inversify';
import { DI } from '../types';
import { ArticleService, getArticleService } from './ArticleService';

const mockArticleItem = {
  id: 'uuid-1',
  article_group: 'group-1',
  slug: 'test-article',
  lang: 'en',
  title: 'Test Article',
  summary: 'Test summary',
  content: '# Hello\n\nThis is content.',
  author: 'Author',
  published_at: '2026-09-01T12:00:00.000Z',
  reading_time_minutes: 2,
  is_featured: true,
  featured_image: {
    name: 'test.webp',
    variants: {
      lg: {
        url: 'https://content.example.com/test-lg.webp',
        width: 1200,
        height: 600,
        format: 'webp',
        default: true,
      },
      sm: {
        url: 'https://content.example.com/test-sm.webp',
        width: 480,
        height: 240,
        format: 'webp',
        default: false,
      },
    },
  },
  tags: ['tech'],
  keywords: ['test'],
  translations: [{ lang: 'de', slug: 'test-artikel', title: 'Test Artikel' }],
};

describe('ArticleService', () => {
  let mockClient: Partial<ContentApiClient>;
  let service: ArticleService;

  beforeEach(() => {
    mockClient = {
      articles: {
        getBySlug: jest.fn().mockResolvedValue(mockArticleItem),
        list: jest.fn().mockResolvedValue({
          total: 1,
          limit: 10,
          offset: 0,
          items: [mockArticleItem],
        }),
        listAll: jest.fn().mockResolvedValue([mockArticleItem]),
      } as unknown as ContentApiClient['articles'],
    };

    service = new ArticleService(mockClient as ContentApiClient);
  });

  describe('getByLookup', () => {
    it('fetches article by slug', async () => {
      const result = await service.getByLookup({
        slug: 'test-article',
        locale: 'en',
      });

      expect(result).toBeDefined();
      expect(result?.title).toBe('Test Article');
      expect(result?.locale).toBe('en');
      expect(result?.coverImages?.original).toBe(
        'https://content.example.com/test-lg.webp',
      );
      expect(result?.translations).toHaveLength(1);
    });

    it('returns undefined if isOnCover filter does not match', async () => {
      const result = await service.getByLookup({
        slug: 'test-article',
        locale: 'en',
        isOnCover: false, // article has is_featured: true
      });

      expect(result).toBeUndefined();
    });

    it('falls back to getMany when slug is not provided', async () => {
      const result = await service.getByLookup({
        id: 'uuid-1',
        locale: 'en',
      });

      expect(result?.id).toBe('uuid-1');
    });
  });

  describe('getById', () => {
    it('delegates to getByLookup with id', async () => {
      const result = await service.getById('uuid-1', 'en');
      expect(result?.id).toBe('uuid-1');
    });
  });

  describe('getMany', () => {
    it('fetches paginated list of articles', async () => {
      const result = await service.getMany({
        params: { locale: 'en' },
        paginate: { take: 5, skip: 0 },
      });

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(mockClient.articles?.list).toHaveBeenCalled();
    });

    it('uses listAll when take is -1', async () => {
      const result = await service.getMany({
        params: { locale: 'en' },
        paginate: { take: -1 },
      });

      expect(result.items).toHaveLength(1);
      expect(mockClient.articles?.listAll).toHaveBeenCalled();
    });

    it('filters by id and slug in-memory if provided', async () => {
      const result = await service.getMany({
        params: { id: 'uuid-1', slug: 'test-article' },
        paginate: { take: -1 },
      });

      expect(result.items).toHaveLength(1);

      const emptyResult = await service.getMany({
        params: { id: 'different-uuid' },
        paginate: { take: -1 },
      });
      expect(emptyResult.items).toHaveLength(0);
    });
  });

  describe('getFirst', () => {
    it('returns the first article from getMany', async () => {
      const result = await service.getFirst({ params: { locale: 'en' } });
      expect(result?.id).toBe('uuid-1');
    });
  });

  describe('search', () => {
    it('searches articles and returns highlighted snippets', async () => {
      const results = await service.search({
        params: { query: 'Hello', locale: 'en' },
      });

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Test Article');
      expect(results[0].contextHighlight).toContain('<mark>Hello</mark>');
    });
  });

  describe('getAll', () => {
    it('returns all articles for a locale', async () => {
      const results = await service.getAll('en');
      expect(results).toHaveLength(1);
      expect(mockClient.articles?.listAll).toHaveBeenCalledWith(
        { lang: 'en' },
        expect.anything(),
      );
    });
  });

  describe('getArticleService', () => {
    it('resolves ArticleService from inversify container', async () => {
      const container = new Container();
      container.bind(DI.ArticleService).toConstantValue(service);

      const resolved = await getArticleService(container);
      expect(resolved).toBe(service);
    });
  });
});
