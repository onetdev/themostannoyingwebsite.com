import { jest } from '@jest/globals';
import {
  ContentApiClient,
  createContentClient,
  DEFAULT_BASE_URL,
} from '../src/index';

function getUrlString(input: string | URL | Request): string {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
}

describe('ContentApiClient', () => {
  it('instantiates with default options and resources', () => {
    const client = createContentClient();
    expect(client).toBeInstanceOf(ContentApiClient);
    expect(client.articles).toBeDefined();
    expect(client.pages).toBeDefined();
    expect(client.tags).toBeDefined();
    expect(client.images).toBeDefined();
    expect(client.health).toBeDefined();
    expect(client.search).toBeDefined();
  });

  describe('articles resource', () => {
    it('calls GET api/v1/articles with query parameters', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              total: 1,
              limit: 10,
              offset: 0,
              items: [
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  article_group: 'group-1',
                  slug: 'sample-article',
                  lang: 'en',
                  title: 'Sample Article',
                  summary: 'A short summary',
                  content: '# Markdown Content',
                  author: 'John Doe',
                  published_at: '2026-09-01T00:00:00.000Z',
                  reading_time_minutes: 3,
                  is_featured: true,
                  featured_image: {
                    name: 'sample.png',
                    variants: {
                      default: {
                        url: 'https://example.com/sample.webp',
                        width: 800,
                        height: 600,
                        format: 'webp',
                        default: true,
                      },
                    },
                  },
                  tags: ['tech', 'fun'],
                  keywords: ['sample'],
                },
              ],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({
        baseUrl: 'https://test-api.example.com/',
        fetch: mockFetch,
      });

      const response = await client.articles.list({
        lang: 'en',
        limit: 10,
        offset: 0,
        is_featured: true,
        tag: 'tech',
        q: 'sample',
      });

      expect(capturedUrl).toContain(
        'https://test-api.example.com/api/v1/articles',
      );
      expect(capturedUrl).toContain('lang=en');
      expect(capturedUrl).toContain('limit=10');
      expect(capturedUrl).toContain('offset=0');
      expect(capturedUrl).toContain('is_featured=true');
      expect(capturedUrl).toContain('tag=tech');
      expect(capturedUrl).toContain('q=sample');

      expect(response.total).toBe(1);
      expect(response.items[0].slug).toBe('sample-article');
    });

    it('calls GET api/v1/articles/{slug} with encoded slug and query parameters', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              id: '00000000-0000-0000-0000-000000000001',
              article_group: 'group-1',
              slug: 'hello-world',
              lang: 'en',
              title: 'Hello World',
              summary: 'Summary',
              content: 'Full body content',
              author: 'Alice',
              published_at: '2026-09-01T00:00:00.000Z',
              reading_time_minutes: 2,
              is_featured: false,
              featured_image: {
                name: 'hello.png',
                variants: {
                  default: {
                    url: 'https://example.com/hello.webp',
                    width: 800,
                    height: 600,
                    format: 'webp',
                    default: true,
                  },
                },
              },
              tags: ['intro'],
              keywords: ['hello'],
              translations: [
                {
                  lang: 'de',
                  slug: 'hallo-welt',
                  title: 'Hallo Welt',
                },
              ],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      const article = await client.articles.getBySlug('hello-world', {
        lang: 'en',
      });

      expect(capturedUrl).toContain(
        `${DEFAULT_BASE_URL}/api/v1/articles/hello-world`,
      );
      expect(capturedUrl).toContain('lang=en');
      expect(article.slug).toBe('hello-world');
      expect(article.translations).toHaveLength(1);
      expect(article.translations[0].lang).toBe('de');
    });
  });

  describe('pages resource', () => {
    it('calls GET api/v1/pages and api/v1/pages/{slug}', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              id: '00000000-0000-0000-0000-000000000002',
              page_group: 'privacy',
              slug: 'privacy-policy',
              lang: 'en',
              title: 'Privacy Policy',
              summary: 'Privacy terms',
              content: 'Content here',
              author: null,
              published_at: null,
              reading_time_minutes: 1,
              created_at: '2026-09-01T00:00:00.000Z',
              updated_at: '2026-09-01T00:00:00.000Z',
              translations: [],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      const page = await client.pages.getBySlug('privacy-policy', {
        lang: 'en',
      });

      expect(capturedUrl).toContain('/api/v1/pages/privacy-policy?lang=en');
      expect(page.slug).toBe('privacy-policy');
    });

    it('lists pages with list()', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              total: 1,
              limit: 20,
              offset: 0,
              items: [],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      const res = await client.pages.list({ limit: 5 });

      expect(capturedUrl).toContain('/api/v1/pages?limit=5');
      expect(res.total).toBe(1);
    });
  });

  describe('tags resource', () => {
    it('calls GET api/v1/tags', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              total: 1,
              limit: 20,
              offset: 0,
              items: [
                {
                  tag: 'funny',
                  lang: 'en',
                  count: 12,
                },
              ],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      const tags = await client.tags.list({ lang: 'en' });

      expect(capturedUrl).toContain('/api/v1/tags?lang=en');
      expect(tags.items[0].tag).toBe('funny');
    });
  });

  describe('images resource', () => {
    it('calls GET api/v1/images', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              total: 1,
              limit: 20,
              offset: 0,
              items: [
                {
                  name: 'banner.png',
                  variants: {
                    sm: {
                      url: 'https://example.com/sm.webp',
                      width: 320,
                      height: 180,
                      format: 'webp',
                      default: true,
                    },
                  },
                },
              ],
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      const images = await client.images.list({ limit: 10 });

      expect(capturedUrl).toContain('/api/v1/images?limit=10');
      expect(images.items[0].name).toBe('banner.png');
    });
  });

  describe('health resource', () => {
    it('calls GET health and GET api/v1/health', async () => {
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              status: 'ok',
              version: '1.0.0',
              database: 'connected',
              timestamp: '2026-09-01T00:00:00.000Z',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          ),
        )
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              status: 'healthy',
              version: '1.0.0',
              database: 'connected',
              timestamp: '2026-09-01T00:00:00.000Z',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          ),
        );

      const client = new ContentApiClient({ fetch: mockFetch });

      const rootHealth = await client.health.check();
      expect(rootHealth.status).toBe('ok');

      const apiHealth = await client.health.apiCheck();
      expect(apiHealth.version).toBe('1.0.0');
      expect(apiHealth.database).toBe('connected');
    });
  });

  describe('options & validation behavior', () => {
    it('allows bypassing schema validation when validateResponses is false', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(
        new Response(
          JSON.stringify({
            unrecognized_field: 123,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );

      const client = new ContentApiClient({
        fetch: mockFetch,
        validateResponses: false,
      });

      const result = await client.articles.list();
      expect((result as Record<string, unknown>).unrecognized_field).toBe(123);
    });

    it('handles query parameters with null, undefined, and non-primitive values in cleanQueryParams', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({ total: 0, limit: 10, offset: 0, items: [] }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        });

      const client = new ContentApiClient({ fetch: mockFetch });
      await client.articles.list({
        limit: 10,
        offset: undefined,
        tag: null as unknown as string,
        q: { nested: 'val' } as unknown as string,
      });

      expect(capturedUrl).toContain('limit=10');
      expect(capturedUrl).not.toContain('offset');
      expect(capturedUrl).not.toContain('tag');
      expect(capturedUrl).toContain('q=%5Bobject+Object%5D');
    });

    it('handles paths with leading slashes and baseUrls with trailing slashes safely without regex', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              status: 'ok',
              version: '1.0.0',
              database: 'connected',
              timestamp: '2026-09-01T00:00:00.000Z',
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        });

      const client = new ContentApiClient({
        baseUrl: 'https://test-api.example.com///',
        fetch: mockFetch,
      });

      await client.health.check();
      expect(capturedUrl).toBe('https://test-api.example.com/health');

      // Test path with leading slashes
      await (
        client as unknown as {
          transport: { get: (path: string) => Promise<unknown> };
        }
      ).transport.get('///health');
      expect(capturedUrl).toBe('https://test-api.example.com/health');
    });

    it('resolves baseUrl from environment variables if not provided', () => {
      const originalEnv = process.env.CONTENT_API_URL;
      process.env.CONTENT_API_URL = 'https://custom-env-api.example.com';

      const client = createContentClient();
      expect(client).toBeInstanceOf(ContentApiClient);

      if (originalEnv !== undefined) {
        process.env.CONTENT_API_URL = originalEnv;
      } else {
        delete process.env.CONTENT_API_URL;
      }
    });

    it('articles.listAll auto-paginates across pages', async () => {
      let callCount = 0;
      const mockFetch = jest.fn<typeof fetch>().mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          return new Response(
            JSON.stringify({
              total: 3,
              limit: 100,
              offset: 0,
              items: [
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  article_group: 'g1',
                  slug: 'art-1',
                  lang: 'en',
                  title: 'Art 1',
                  summary: 'Sum 1',
                  content: 'Cont 1',
                  author: 'Author',
                  published_at: '2026-09-01T00:00:00.000Z',
                  reading_time_minutes: 1,
                  is_featured: false,
                  featured_image: {
                    name: 'img.webp',
                    variants: {
                      def: {
                        url: 'https://example.com/img.webp',
                        width: 800,
                        height: 600,
                        format: 'webp',
                        default: true,
                      },
                    },
                  },
                  tags: [],
                  keywords: [],
                },
                {
                  id: '00000000-0000-0000-0000-000000000002',
                  article_group: 'g2',
                  slug: 'art-2',
                  lang: 'en',
                  title: 'Art 2',
                  summary: 'Sum 2',
                  content: 'Cont 2',
                  author: 'Author',
                  published_at: '2026-09-01T00:00:00.000Z',
                  reading_time_minutes: 1,
                  is_featured: false,
                  featured_image: {
                    name: 'img2.webp',
                    variants: {
                      def: {
                        url: 'https://example.com/img2.webp',
                        width: 800,
                        height: 600,
                        format: 'webp',
                        default: true,
                      },
                    },
                  },
                  tags: [],
                  keywords: [],
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        }
        return new Response(
          JSON.stringify({
            total: 3,
            limit: 100,
            offset: 2,
            items: [
              {
                id: '00000000-0000-0000-0000-000000000003',
                article_group: 'g3',
                slug: 'art-3',
                lang: 'en',
                title: 'Art 3',
                summary: 'Sum 3',
                content: 'Cont 3',
                author: 'Author',
                published_at: '2026-09-01T00:00:00.000Z',
                reading_time_minutes: 1,
                is_featured: false,
                featured_image: {
                  name: 'img3.webp',
                  variants: {
                    def: {
                      url: 'https://example.com/img3.webp',
                      width: 800,
                      height: 600,
                      format: 'webp',
                      default: true,
                    },
                  },
                },
                tags: [],
                keywords: [],
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      });

      const client = new ContentApiClient({
        baseUrl: 'https://test-api.example.com/',
        fetch: mockFetch,
      });

      const all = await client.articles.listAll({ lang: 'en' });
      expect(all.length).toBe(3);
      expect(callCount).toBe(2);
    });

    it('pages.listAll auto-paginates across pages', async () => {
      const mockFetch = jest.fn<typeof fetch>().mockImplementation(async () => {
        return new Response(
          JSON.stringify({
            total: 1,
            limit: 100,
            offset: 0,
            items: [
              {
                id: '00000000-0000-0000-0000-000000000001',
                page_group: 'pg-1',
                slug: 'terms',
                lang: 'en',
                title: 'Terms',
                summary: 'Summary',
                content: 'Markdown content',
                author: null,
                published_at: null,
                reading_time_minutes: 1,
                created_at: '2026-09-01T00:00:00.000Z',
                updated_at: '2026-09-01T00:00:00.000Z',
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      });

      const client = new ContentApiClient({
        baseUrl: 'https://test-api.example.com/',
        fetch: mockFetch,
      });
      const all = await client.pages.listAll({ lang: 'en' });
      expect(all.length).toBe(1);
    });
  });

  describe('search resource', () => {
    it('calls GET api/v1/search with query parameters', async () => {
      let capturedUrl = '';
      const mockFetch = jest
        .fn<typeof fetch>()
        .mockImplementation(async (req) => {
          capturedUrl = getUrlString(req);
          return new Response(
            JSON.stringify({
              total: 1,
              limit: 20,
              offset: 0,
              items: [
                {
                  id: '00000000-0000-0000-0000-000000000001',
                  type: 'article',
                  slug: 'sample-article',
                  lang: 'en',
                  title: 'Sample **Article**',
                  excerpt: 'This is a sample **article** excerpt',
                },
              ],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        });

      const client = createContentClient({ fetch: mockFetch });
      const result = await client.search.query({ q: 'Article', lang: 'en' });

      expect(capturedUrl).toContain('/api/v1/search?q=Article&lang=en');
      expect(result.items).toHaveLength(1);
      expect(result.items[0].type).toBe('article');
      expect(result.items[0].title).toBe('Sample **Article**');
    });
  });
});
