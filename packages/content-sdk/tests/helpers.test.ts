import type { ImageAsset } from '../src/generated/endpoints';
import {
  getBestImageVariant,
  getDefaultImageVariant,
  getImageSrcSet,
  getImageVariantUrl,
  toCoverImages,
} from '../src/helpers/images';

describe('Image Variant Helpers', () => {
  const mockImage: ImageAsset = {
    name: 'hero-banner.png',
    variants: {
      sm: {
        url: 'https://cdn.example.com/hero-sm.webp',
        width: 480,
        height: 270,
        format: 'webp',
        default: false,
      },
      md: {
        url: 'https://cdn.example.com/hero-md.webp',
        width: 800,
        height: 450,
        format: 'webp',
        default: true,
      },
      lg: {
        url: 'https://cdn.example.com/hero-lg.avif',
        width: 1200,
        height: 675,
        format: 'avif',
        default: false,
      },
    },
  };

  describe('getDefaultImageVariant', () => {
    it('returns the variant marked default: true', () => {
      const variant = getDefaultImageVariant(mockImage);
      expect(variant?.width).toBe(800);
      expect(variant?.default).toBe(true);
    });

    it('returns undefined if image or variants are missing/empty', () => {
      expect(getDefaultImageVariant(undefined)).toBeUndefined();
      expect(getDefaultImageVariant(null)).toBeUndefined();
      expect(
        getDefaultImageVariant({ name: 'empty.png', variants: {} }),
      ).toBeUndefined();
    });

    it('falls back to the first available variant if none is marked default', () => {
      const noDefaultImage: ImageAsset = {
        name: 'no-default.png',
        variants: {
          first: {
            url: 'https://cdn.example.com/first.png',
            width: 100,
            height: 100,
            format: 'png',
            default: false,
          },
        },
      };
      const variant = getDefaultImageVariant(noDefaultImage);
      expect(variant?.width).toBe(100);
    });
  });

  describe('getBestImageVariant', () => {
    it('selects best variant matching minWidth', () => {
      const variant = getBestImageVariant(mockImage, { minWidth: 600 });
      expect(variant?.width).toBe(800);
    });

    it('selects best variant matching maxWidth', () => {
      const variant = getBestImageVariant(mockImage, { maxWidth: 500 });
      expect(variant?.width).toBe(480);
    });

    it('selects best variant matching format', () => {
      const variant = getBestImageVariant(mockImage, { format: 'avif' });
      expect(variant?.format).toBe('avif');
      expect(variant?.width).toBe(1200);
    });

    it('falls back to default variant if no constraints match', () => {
      const variant = getBestImageVariant(mockImage, { minWidth: 2000 });
      expect(variant?.width).toBe(800);
    });

    it('returns undefined for empty image or empty variants', () => {
      expect(getBestImageVariant(null)).toBeUndefined();
      expect(
        getBestImageVariant({ name: 'empty', variants: {} }),
      ).toBeUndefined();
    });
  });

  describe('getImageVariantUrl', () => {
    it('returns the specific variant URL when requested by key', () => {
      expect(getImageVariantUrl(mockImage, 'lg')).toBe(
        'https://cdn.example.com/hero-lg.avif',
      );
    });

    it('falls back to default variant URL if key not found', () => {
      expect(getImageVariantUrl(mockImage, 'non-existent')).toBe(
        'https://cdn.example.com/hero-md.webp',
      );
    });

    it('returns default variant URL when no key specified', () => {
      expect(getImageVariantUrl(mockImage)).toBe(
        'https://cdn.example.com/hero-md.webp',
      );
    });

    it('returns undefined if image is null/undefined', () => {
      expect(getImageVariantUrl(null)).toBeUndefined();
    });
  });

  describe('toCoverImages', () => {
    it('maps image variants to { original, thumbnail } correctly', () => {
      const cover = toCoverImages(mockImage);
      expect(cover?.original).toBe('https://cdn.example.com/hero-lg.avif');
      expect(cover?.thumbnail).toBe('https://cdn.example.com/hero-sm.webp');
    });

    it('returns undefined if image has no variants', () => {
      expect(toCoverImages(undefined)).toBeUndefined();
      expect(toCoverImages(null)).toBeUndefined();
      expect(toCoverImages({ name: 'test', variants: {} })).toBeUndefined();
    });
  });

  describe('getImageSrcSet', () => {
    it('generates a standard srcSet string', () => {
      const srcSet = getImageSrcSet(mockImage);
      expect(srcSet).toContain('https://cdn.example.com/hero-sm.webp 480w');
      expect(srcSet).toContain('https://cdn.example.com/hero-md.webp 800w');
      expect(srcSet).toContain('https://cdn.example.com/hero-lg.avif 1200w');
    });

    it('returns undefined if image has no variants', () => {
      expect(getImageSrcSet(undefined)).toBeUndefined();
      expect(getImageSrcSet({ name: 'empty', variants: {} })).toBeUndefined();
    });
  });
});
