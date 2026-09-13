import type { ApiImageWrapper, ImageVariantInfo } from '../generated/endpoints';

/**
 * Returns the default image variant from an image asset, or the first available variant.
 */
export function getDefaultImageVariant(
  image?: ApiImageWrapper | null,
): ImageVariantInfo | undefined {
  if (!image?.variants) {
    return undefined;
  }

  const variants = Object.values(image.variants);
  if (variants.length === 0) {
    return undefined;
  }

  return variants.find((v) => v.default) ?? variants[0];
}

export interface BestImageVariantOptions {
  /** Preferred minimum width in pixels */
  minWidth?: number;
  /** Preferred maximum width in pixels */
  maxWidth?: number;
  /** Preferred image format (e.g. 'webp', 'avif', 'png') */
  format?: string;
}

/**
 * Selects the best image variant matching criteria such as min/max width and format.
 */
export function getBestImageVariant(
  image?: ApiImageWrapper | null,
  options?: BestImageVariantOptions,
): ImageVariantInfo | undefined {
  if (!image?.variants) {
    return undefined;
  }

  const variants = Object.values(image.variants);
  if (variants.length === 0) {
    return undefined;
  }

  let candidates = variants;

  if (options?.format) {
    const formatMatched = candidates.filter(
      (v) => v.format.toLowerCase() === options.format?.toLowerCase(),
    );
    if (formatMatched.length > 0) {
      candidates = formatMatched;
    }
  }

  if (options?.minWidth !== undefined) {
    const minMatched = candidates.filter(
      (v) => v.width >= (options.minWidth ?? 0),
    );
    if (minMatched.length > 0) {
      // Pick the smallest that satisfies minWidth
      return minMatched.sort((a, b) => a.width - b.width)[0];
    }
  }

  if (options?.maxWidth !== undefined) {
    const maxMatched = candidates.filter(
      (v) => v.width <= (options.maxWidth ?? 0),
    );
    if (maxMatched.length > 0) {
      // Pick the largest that satisfies maxWidth
      return maxMatched.sort((a, b) => b.width - a.width)[0];
    }
  }

  return candidates.find((v) => v.default) ?? candidates[0];
}

/**
 * Convenience helper to get the URL for a specific image variant, or the default variant URL.
 */
export function getImageVariantUrl(
  image?: ApiImageWrapper | null,
  variantKey?: string,
): string | undefined {
  if (!image?.variants) {
    return undefined;
  }

  if (variantKey && image.variants[variantKey]) {
    return image.variants[variantKey].url;
  }

  return getDefaultImageVariant(image)?.url;
}

export interface CoverImages {
  original: string;
  thumbnail: string;
}

/**
 * Convenience helper to map an ApiImageWrapper to the cover images shape { original, thumbnail }.
 */
export function toCoverImages(
  image?: ApiImageWrapper | null,
): CoverImages | undefined {
  if (!image?.variants) {
    return undefined;
  }

  const defaultOrLg =
    image.variants.lg?.url ??
    getDefaultImageVariant(image)?.url ??
    getBestImageVariant(image, { minWidth: 1000 })?.url;

  const thumbnailOrSm =
    image.variants.sm?.url ??
    getBestImageVariant(image, { maxWidth: 600 })?.url ??
    defaultOrLg;

  if (!defaultOrLg) {
    return undefined;
  }

  return {
    original: defaultOrLg,
    thumbnail: thumbnailOrSm ?? defaultOrLg,
  };
}

/**
 * Builds a standard responsive HTML img srcSet string from all image variants.
 */
export function getImageSrcSet(
  image?: ApiImageWrapper | null,
): string | undefined {
  if (!image?.variants) {
    return undefined;
  }

  const entries = Object.values(image.variants)
    .filter((v) => v.url && v.width)
    .map((v) => `${v.url} ${v.width}w`);

  return entries.length > 0 ? entries.join(', ') : undefined;
}
