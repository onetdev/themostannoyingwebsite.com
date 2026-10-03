import { createContentClient } from '@maw/content-sdk';

/**
 * Same-origin path the Next.js dev server proxies to the Content API.
 *
 * Kept in sync with the route handler at
 * `apps/web/src/app/api/content/[...path]/route.ts`.
 */
export const CONTENT_API_DEV_PROXY_PATH = '/api/content';

/**
 * Resolves the base URL used by Content API requests in the current runtime.
 *
 * Browser requests during local development go through the same-origin dev
 * proxy so they never hit the Content API's CORS allowlist, which deliberately
 * excludes `localhost` in production. Server-side requests (and every
 * non-development environment) keep the SDK default
 * (`NEXT_PUBLIC_CONTENT_API_URL`); relative URLs do not work in Node.
 */
export function resolveAppContentApiBaseUrl(
  environment: string | undefined = process.env.NODE_ENV,
  isBrowser: boolean = typeof window !== 'undefined',
): string | undefined {
  if (!isBrowser) {
    return undefined;
  }

  return environment === 'development' ? CONTENT_API_DEV_PROXY_PATH : undefined;
}

/**
 * Creates a Content API client for the current runtime.
 *
 * Prefer this over the raw SDK factory so browser requests are transparently
 * proxied during local development.
 */
export function createAppContentClient(
  environment: string | undefined = process.env.NODE_ENV,
  isBrowser: boolean = typeof window !== 'undefined',
) {
  return createContentClient({
    baseUrl: resolveAppContentApiBaseUrl(environment, isBrowser),
  });
}
