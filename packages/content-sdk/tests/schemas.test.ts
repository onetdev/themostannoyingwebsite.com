import {
  ArticleDetailSchema,
  ArticleItemSchema,
  ENDPOINTS,
  GetArticlesQuerySchema,
  GetArticlesResponseSchema,
  GetImagesResponseSchema,
  GetTagsResponseSchema,
  HealthResponseSchema,
  InternalServerErrorSchema,
  LanguageSchema,
  NotFoundErrorSchema,
  PageDetailSchema,
  PageItemSchema,
  ValidationErrorSchema,
} from '../src/index.js';

describe('Content SDK Schemas & Types', () => {
  describe('LanguageSchema', () => {
    it('accepts valid language codes', () => {
      expect(LanguageSchema.parse('en')).toBe('en');
      expect(LanguageSchema.parse('de')).toBe('de');
      expect(LanguageSchema.parse('ja')).toBe('ja');
      expect(LanguageSchema.parse('zh')).toBe('zh');
    });

    it('rejects invalid language codes', () => {
      expect(() => LanguageSchema.parse('invalid')).toThrow();
    });
  });

  describe('ArticleItemSchema', () => {
    const validArticle = {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      article_group: 'test-article-group',
      slug: 'my-first-article',
      lang: 'en',
      title: 'My First Article',
      summary: 'A short summary',
      content: '# Hello World\nThis is markdown.',
      author: 'Tester',
      published_at: '2026-09-12T12:00:00.000Z',
      reading_time_minutes: 3,
      is_featured: true,
      featured_image: {
        name: 'cover.jpg',
        variants: {
          sm: {
            url: 'https://example.com/sm.webp',
            width: 400,
            height: 300,
            format: 'webp',
            file_size_bytes: 12345,
          },
        },
      },
      tags: ['annoying', 'fun'],
      keywords: ['test', 'sample'],
    };

    it('validates a complete article item', () => {
      const parsed = ArticleItemSchema.parse(validArticle);
      expect(parsed.slug).toBe('my-first-article');
      expect(parsed.featured_image?.name).toBe('cover.jpg');
    });

    it('allows featured_image to be null', () => {
      const parsed = ArticleItemSchema.parse({
        ...validArticle,
        featured_image: null,
      });
      expect(parsed.featured_image).toBeNull();
    });

    it('validates ArticleDetailSchema with translations', () => {
      const detail = {
        ...validArticle,
        translations: [
          {
            lang: 'de',
            slug: 'mein-erster-artikel',
            title: 'Mein erster Artikel',
          },
        ],
      };
      const parsed = ArticleDetailSchema.parse(detail);
      expect(parsed.translations).toHaveLength(1);
      expect(parsed.translations[0].lang).toBe('de');
    });
  });

  describe('PageItemSchema', () => {
    const validPage = {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
      page_group: 'privacy-policy',
      slug: 'privacy-policy',
      lang: 'en',
      title: 'Privacy Policy',
      summary: null,
      content: '## Privacy\nWe do not care.',
      author: null,
      published_at: null,
      reading_time_minutes: 1,
      created_at: '2026-09-01T00:00:00.000Z',
      updated_at: '2026-09-02T00:00:00.000Z',
    };

    it('validates a static page item with nullable fields', () => {
      const parsed = PageItemSchema.parse(validPage);
      expect(parsed.slug).toBe('privacy-policy');
      expect(parsed.summary).toBeNull();
    });

    it('validates PageDetailSchema with translations', () => {
      const detail = {
        ...validPage,
        translations: [
          {
            lang: 'fr',
            slug: 'politique-de-confidentialite',
            title: 'Politique de confidentialité',
          },
        ],
      };
      const parsed = PageDetailSchema.parse(detail);
      expect(parsed.translations).toHaveLength(1);
    });
  });

  describe('GetArticlesQuerySchema', () => {
    it('applies default limit and offset', () => {
      const parsed = GetArticlesQuerySchema.parse({});
      expect(parsed.limit).toBe(20);
      expect(parsed.offset).toBe(0);
    });

    it('validates query parameters with filters', () => {
      const parsed = GetArticlesQuerySchema.parse({
        lang: 'en',
        limit: 50,
        offset: 10,
        q: 'search term',
        tag: 'tech',
        is_featured: true,
      });
      expect(parsed.lang).toBe('en');
      expect(parsed.limit).toBe(50);
      expect(parsed.is_featured).toBe(true);
    });
  });

  describe('Paginated Responses', () => {
    it('validates GetArticlesResponseSchema', () => {
      const response = {
        total: 1,
        limit: 20,
        offset: 0,
        items: [
          {
            id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
            article_group: 'group-1',
            slug: 'article-1',
            lang: 'en',
            title: 'Article 1',
            summary: 'Summary 1',
            content: 'Content 1',
            author: 'Author 1',
            published_at: '2026-09-12T00:00:00.000Z',
            reading_time_minutes: 2,
            is_featured: false,
            featured_image: null,
            tags: ['tag1'],
            keywords: ['kw1'],
          },
        ],
      };
      const parsed = GetArticlesResponseSchema.parse(response);
      expect(parsed.items).toHaveLength(1);
    });

    it('validates GetTagsResponseSchema', () => {
      const response = {
        total: 1,
        limit: 20,
        offset: 0,
        items: [
          {
            tag: 'humor',
            lang: 'en',
            count: 42,
          },
        ],
      };
      const parsed = GetTagsResponseSchema.parse(response);
      expect(parsed.items[0].count).toBe(42);
    });

    it('validates GetImagesResponseSchema', () => {
      const response = {
        total: 1,
        limit: 20,
        offset: 0,
        items: [
          {
            name: 'hero.png',
            variants: {
              lg: {
                url: 'https://cdn.example.com/hero-lg.webp',
                width: 1200,
                height: 800,
                format: 'webp',
              },
            },
          },
        ],
      };
      const parsed = GetImagesResponseSchema.parse(response);
      expect(parsed.items[0].name).toBe('hero.png');
    });
  });

  describe('System & Error Schemas', () => {
    it('validates HealthResponseSchema', () => {
      const health = {
        status: 'ok',
        version: '1.0.0',
        database: 'connected',
        timestamp: '2026-09-12T12:00:00.000Z',
      };
      const parsed = HealthResponseSchema.parse(health);
      expect(parsed.status).toBe('ok');
    });

    it('validates ValidationErrorSchema', () => {
      const error = {
        code: 'VALIDATION_ERROR',
        error: 'Invalid parameter',
        message: 'limit must be between 1 and 100',
      };
      const parsed = ValidationErrorSchema.parse(error);
      expect(parsed.code).toBe('VALIDATION_ERROR');
    });

    it('validates NotFoundErrorSchema', () => {
      const error = {
        code: 'NOT_FOUND',
        error: 'Article not found',
        message: "Article 'foo' not found",
      };
      const parsed = NotFoundErrorSchema.parse(error);
      expect(parsed.code).toBe('NOT_FOUND');
    });

    it('validates InternalServerErrorSchema', () => {
      const error = {
        code: 'INTERNAL_SERVER_ERROR',
        error: 'Database connection failed',
      };
      const parsed = InternalServerErrorSchema.parse(error);
      expect(parsed.code).toBe('INTERNAL_SERVER_ERROR');
    });
  });

  describe('ENDPOINTS metadata', () => {
    it('defines expected endpoints with paths and methods', () => {
      expect(ENDPOINTS.getArticles.path).toBe('/api/v1/articles');
      expect(ENDPOINTS.getArticles.method).toBe('GET');
      expect(ENDPOINTS.getArticleBySlug.path).toBe('/api/v1/articles/{slug}');
      expect(ENDPOINTS.getPages.path).toBe('/api/v1/pages');
      expect(ENDPOINTS.getPageBySlug.path).toBe('/api/v1/pages/{slug}');
      expect(ENDPOINTS.getTags.path).toBe('/api/v1/tags');
      expect(ENDPOINTS.getImages.path).toBe('/api/v1/images');
      expect(ENDPOINTS.health.path).toBe('/health');
    });
  });
});
