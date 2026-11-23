import { trimTrailingSlashes } from '@maw/utils/url';

export const CONTENT_API_BASE_URL =
  'https://content.themostannoyingwebsite.com';

/**
 * Resolves the absolute Content API base URL used by build scripts and E2E
 * helpers, stripping any trailing slash.
 *
 * Browser and server requests use the same configured URL. Unset or empty
 * values fall back to the production Content API.
 */
export function resolveContentApiBaseUrl(
  configured: string | undefined = process.env.NEXT_PUBLIC_CONTENT_API_URL,
): string {
  // Treat an empty/whitespace value (e.g. an unset Actions environment variable
  // that expands to an empty string) as unconfigured so we still fall back to
  // the production default instead of a relative, unusable URL.
  return trimTrailingSlashes(configured?.trim() || CONTENT_API_BASE_URL);
}
