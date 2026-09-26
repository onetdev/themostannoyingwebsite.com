import type { Options as KyOptions } from 'ky';

export const DEFAULT_BASE_URL = 'https://content.themostannoyingwebsite.com';
export const DEFAULT_TIMEOUT_MS = 10_000;

export const CONTENT_CACHE_TAGS = {
  all: 'content:*',
  articles: 'content:articles',
  pages: 'content:pages',
  tags: 'content:tags',
  images: 'content:images',
  locales: 'content:locales',
  translations: 'content:translations',
  variants: 'content:variants',
} as const;

export interface ContentClientOptions {
  /**
   * Base URL for the headless Content API.
   * @default 'https://content.themostannoyingwebsite.com'
   */
  baseUrl?: string;

  /**
   * Custom fetch implementation (e.g. for testing, mocks, or custom environments).
   */
  fetch?: typeof fetch;

  /**
   * Global request timeout in milliseconds.
   * @default 10000
   */
  timeoutMs?: number;

  /**
   * Retry options or retry count.
   */
  retry?: KyOptions['retry'];

  /**
   * Default headers included with every request.
   */
  headers?: Record<string, string>;

  /**
   * Whether to validate response payloads against Zod schemas.
   * @default true
   */
  validateResponses?: boolean;
}

export interface RequestOptions
  extends Omit<KyOptions, 'searchParams' | 'json' | 'prefixUrl'> {
  /**
   * Next.js App Router specific fetch options (revalidation, cache tags).
   */
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };

  /**
   * Request timeout in milliseconds override.
   */
  timeoutMs?: number;
}
