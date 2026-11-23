import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  ContentApiNotFoundError,
  type Page,
} from '@maw/content-sdk';
import { cache } from 'react';
import { createAppContentClient } from '@/core/content';

export const PRIVACY_POLICY_SLUG = 'privacy-policy';

/**
 * Loads the localized privacy policy from the Content API pages endpoint.
 *
 * A genuine 404 (the page group no longer exists, or the API has no page for
 * this locale) resolves to `undefined` so the route can render its own 404.
 * Network and server failures are rethrown so the route error boundary renders
 * a retry instead of a misleading "page not found".
 */
export async function fetchPrivacyPolicyPage(
  client: ContentApiClient,
  locale: AppLocale,
): Promise<Page | undefined> {
  try {
    return await client.pages.getBySlug(
      PRIVACY_POLICY_SLUG,
      { lang: locale },
      {
        next: {
          revalidate: 1800,
          tags: [CONTENT_CACHE_TAGS.pages],
        },
      },
    );
  } catch (error) {
    if (error instanceof ContentApiNotFoundError) {
      return undefined;
    }

    throw error;
  }
}

/**
 * Request-scoped loader shared by the page render.
 *
 * Wrapped in React `cache()` so a single render does not fetch the same page
 * twice, and so future consumers (for example `generateMetadata`) share the
 * request.
 */
export const loadPrivacyPolicyPage = cache((locale: AppLocale) =>
  fetchPrivacyPolicyPage(createAppContentClient(), locale),
);
