import {
  ApiImageWrapper,
  LanguageCode,
  ListArticlesQueryParams,
  ValidationErrorResponse,
} from '../src/index';

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
        error: 'Invalid query parameter',
        message: 'lang is invalid',
      };
      const parsed = ValidationErrorResponse.parse(error);
      expect(parsed.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('ListArticlesQueryParams', () => {
    it('accepts valid query parameters with reusable LanguageCode', () => {
      const query = {
        lang: 'es',
        limit: 10,
      };
      const parsed = ListArticlesQueryParams.parse(query);
      expect(parsed.lang).toBe('es');
      expect(parsed.limit).toBe(10);
    });
  });
});
