import {
  ApiImageWrapper,
  ArticleResponseItem,
  GetArticleListQueryParams,
  LanguageCode,
  SearchResponseItem,
  ShortVideoDetailResponse,
  ShortVideoResponseItem,
  ValidationErrorResponse,
} from '../src/index';

const articlePayload = {
  id: '00000000-0000-0000-0000-000000000001',
  article_group: 'group-1',
  slug: 'sample-article',
  lang: 'en',
  title: 'Sample Article',
  summary: 'A short summary',
  content: '# Markdown Content',
  author: {
    id: '00000000-0000-0000-0000-0000000000a1',
    slug: 'john-doe',
    name: 'John Doe',
    persona: 'The Everyman',
    avatar: null,
  },
  published_at: '2026-09-01T00:00:00.000Z',
  reading_time_minutes: 3,
  is_featured: true,
  ai_assisted: true,
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
  categories: [{ id: 'tech', label: 'Tech' }],
  keywords: ['sample'],
  created_at: '2026-09-01T00:00:00.000Z',
  updated_at: '2026-09-01T00:00:00.000Z',
};

const shortPayload = {
  id: '00000000-0000-0000-0000-000000000001',
  short_video_group: '001-caveman-dirtbike-vhs',
  slug: 'caveman-dirtbike-vhs',
  lang: 'en',
  title: '1995 Called',
  summary: 'Prehistoric man, modern dirt bike.',
  author: {
    id: '00000000-0000-0000-0000-0000000000a1',
    slug: 'silver-haired-nostalgist',
    name: 'Tomás Ferreira',
    persona: 'The Silver-Haired Nostalgist',
    avatar: null,
  },
  published_at: '2026-11-21',
  duration_ms: 8042,
  width: 720,
  height: 1280,
  has_audio: true,
  is_featured: false,
  ai_assisted: true,
  categories: [{ id: 'humor', label: 'Humor' }],
  cues: [
    {
      shot_id: 'shot-1',
      start_ms: 0,
      end_ms: 2200,
      text: 'Cue text',
    },
  ],
  media: [
    {
      kind: 'video',
      variant: '720p',
      format: 'mp4',
      width: 720,
      height: 1280,
      duration_ms: 8042,
      file_size_bytes: 3092995,
      default: true,
      url: 'https://media.example.com/720p.mp4',
    },
  ],
  subtitle_url: 'https://media.example.com/en.vtt',
  created_at: '2026-11-21T00:00:00.000Z',
  updated_at: '2026-11-21T00:00:00.000Z',
};

describe('Content SDK Zod Schemas', () => {
  describe('LanguageCode', () => {
    it('validates supported languages', () => {
      expect(LanguageCode.parse('en')).toBe('en');
      expect(LanguageCode.parse('de')).toBe('de');
      expect(LanguageCode.parse('zh')).toBe('zh');
    });

    it('rejects unsupported languages', () => {
      expect(() => LanguageCode.parse('invalid')).toThrow();
    });
  });

  describe('ApiImageWrapper & ImageVariantInfo', () => {
    it('validates image wrapper with arbitrary string keys for variants', () => {
      const image = {
        name: 'sample.png',
        variants: {
          sm: {
            url: 'https://example.com/sm.webp',
            width: 400,
            height: 300,
            format: 'webp',
            file_size_bytes: 1024,
            default: false,
          },
          lg: {
            url: 'https://example.com/lg.webp',
            width: 1200,
            height: 800,
            format: 'webp',
            file_size_bytes: 5048,
            default: true,
          },
          custom_variant: {
            url: 'https://example.com/custom.webp',
            width: 800,
            height: 600,
            format: 'webp',
            file_size_bytes: 2048,
            default: false,
          },
        },
      };

      const parsed = ApiImageWrapper.parse(image);
      expect(parsed.name).toBe('sample.png');
      expect(parsed.variants.sm.width).toBe(400);
      expect(parsed.variants.lg.width).toBe(1200);
      expect(parsed.variants.custom_variant.width).toBe(800);
    });
  });

  describe('ErrorResponse & ValidationErrorResponse', () => {
    it('validates error responses', () => {
      const error = {
        code: 'VALIDATION_ERROR',
        message: 'lang is invalid',
        issues: [
          {
            code: 'invalid_value',
            path: ['lang'],
            message: 'Invalid language code',
          },
        ],
      };
      const parsed = ValidationErrorResponse.parse(error);
      expect(parsed.code).toBe('VALIDATION_ERROR');
      expect(parsed.issues).toHaveLength(1);
    });
  });

  describe('GetArticleListQueryParams', () => {
    it('accepts valid query parameters with reusable LanguageCode', () => {
      const query = {
        lang: 'es',
        limit: 10,
      };
      const parsed = GetArticleListQueryParams.parse(query);
      expect(parsed.lang).toBe('es');
      expect(parsed.limit).toBe(10);
    });
  });

  describe('ArticleResponseItem', () => {
    it('validates an AI-assistance disclosure flag', () => {
      const parsed = ArticleResponseItem.parse(articlePayload);
      expect(parsed.ai_assisted).toBe(true);
    });

    it('rejects an article response without ai_assisted', () => {
      const withoutAiAssisted: Record<string, unknown> = { ...articlePayload };
      delete withoutAiAssisted.ai_assisted;

      expect(() => ArticleResponseItem.parse(withoutAiAssisted)).toThrow();
    });
  });

  describe('ShortVideoResponseItem', () => {
    it('validates a localized short with cues and media renditions', () => {
      const parsed = ShortVideoResponseItem.parse(shortPayload);
      expect(parsed.slug).toBe('caveman-dirtbike-vhs');
      expect(parsed.cues).toHaveLength(1);
      expect(parsed.media[0].variant).toBe('720p');
      expect(parsed.ai_assisted).toBe(true);
    });

    it('validates a short detail response with translations', () => {
      const parsed = ShortVideoDetailResponse.parse({
        ...shortPayload,
        translations: [
          {
            lang: 'de',
            slug: 'caveman-dirtbike-vhs',
            title: '1995 hat angerufen',
          },
        ],
      });

      expect(parsed.translations).toHaveLength(1);
      expect(parsed.translations[0].lang).toBe('de');
    });

    it('rejects a short response without ai_assisted', () => {
      const withoutAiAssisted: Record<string, unknown> = { ...shortPayload };
      delete withoutAiAssisted.ai_assisted;

      expect(() => ShortVideoResponseItem.parse(withoutAiAssisted)).toThrow();
    });
  });

  describe('SearchResponseItem', () => {
    it('accepts shorts as a search result type', () => {
      const parsed = SearchResponseItem.parse({
        id: '00000000-0000-0000-0000-000000000002',
        type: 'short-video',
        slug: 'caveman-dirtbike-vhs',
        lang: 'en',
        title: '1995 Called',
        excerpt: 'Prehistoric man, modern dirt bike.',
      });

      expect(parsed.type).toBe('short-video');
    });
  });
});
