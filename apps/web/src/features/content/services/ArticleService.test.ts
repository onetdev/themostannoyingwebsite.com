import 'reflect-metadata';

import type { ContentApiClient } from '@maw/content-sdk';
import { Container } from 'inversify';
import { DI } from '../types';
import { ArticleService, getArticleService } from './ArticleService';

const mockArticleItem = {
  id: 'uuid-1',
  article_group: 'group-1',
  slug: 'test-article',
  lang: 'en' as const,
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
  translations: [
    { lang: 'de' as const, slug: 'test-artikel', title: 'Test Artikel' },
  ],
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
      search: {
        query: jest.fn().mockResolvedValue({
          total: 1,
          limit: 20,
          offset: 0,
          items: [
            {
              id: 'uuid-1',
              type: 'article',
              slug: 'test-article',
              lang: 'en',
              title: 'Test Article',
              excerpt: 'This is a **Hello** world snippet.',
            },
          ],
        }),
      } as unknown as ContentApiClient['search'],
    };

    service = new ArticleService(mockClient as ContentApiClient);
  });

  describe('getBySlug', () => {
    it('fetches article by slug', async () => {
      const result = await service.getBySlug('test-article', 'en');

      expect(result).toBeDefined();
      expect(result?.title).toBe('Test Article');
      expect(result?.lang).toBe('en');
      expect(result?.translations).toHaveLength(1);
      expect(mockClient.articles?.getBySlug).toHaveBeenCalledWith(
        'test-article',
        { lang: 'en' },
        expect.anything(),
      );
    });

    it('returns undefined if client throws an error', async () => {
      (mockClient.articles?.getBySlug as jest.Mock).mockRejectedValueOnce(
        new Error('Not found'),
      );

      const result = await service.getBySlug('missing');
      expect(result).toBeUndefined();
    });
  });

  describe('list', () => {
    it('fetches list of articles with query params', async () => {
      const result = await service.list({
        lang: 'en',
        limit: 5,
        offset: 0,
      });

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(mockClient.articles?.list).toHaveBeenCalledWith(
        { lang: 'en', limit: 5, offset: 0 },
        expect.anything(),
      );
    });
  });

  describe('listAll', () => {
    it('fetches all articles using auto-pagination', async () => {
      const result = await service.listAll({ lang: 'en' });

      expect(result).toHaveLength(1);
      expect(mockClient.articles?.listAll).toHaveBeenCalledWith(
        { lang: 'en' },
        expect.anything(),
      );
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
      expect(mockClient.search?.query).toHaveBeenCalledWith(
        {
          q: 'Hello',
          lang: 'en',
          limit: 20,
          offset: 0,
          type: 'article',
        },
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
