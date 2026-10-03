import { trimTrailingSlashes } from '@maw/utils/url';

export const CONTENT_API_BASE_URL =
  'https://content.themostannoyingwebsite.com';

/**
 * Resolves the absolute Content API base URL, stripping any trailing slash so
 * it can be joined with request path segments.
 */
export function resolveContentApiBaseUrl(
  configured: string | undefined = process.env.NEXT_PUBLIC_CONTENT_API_URL,
): string {
  return trimTrailingSlashes(configured ?? CONTENT_API_BASE_URL);
}

/**
 * Builds the upstream Content API URL for a proxied browser request. Empty
 * segments (produced by trailing slashes) are dropped because the Content API
 * does not match trailing slashes.
 */
export function buildContentApiProxyUrl(
  segments: string[],
  search: string,
  configuredBaseUrl?: string,
): URL {
  const target = new URL(
    `${resolveContentApiBaseUrl(configuredBaseUrl)}/${segments
      .filter(Boolean)
      .join('/')}`,
  );
  target.search = search;
  return target;
}

/**
 * The same-origin Content API proxy is only active during local development.
 * Production and preview deployments call the API directly through its
 * allowlisted origins.
 */
export function isContentApiProxyEnabled(
  environment: string | undefined = process.env.NODE_ENV,
): boolean {
  return environment === 'development';
}
