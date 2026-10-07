import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type DonationSummary,
  type LanguageCode,
} from '@maw/content-sdk';
import { createAppContentClient } from '@/core/content';

const DONATION_REVALIDATE_SECONDS = 1800;

/**
 * Fetches the donation summary from the Content API with the donation cache
 * tag. Throws when the request fails; use {@link getDonationSummary} for the
 * graceful variant.
 */
export async function fetchDonationSummary(
  client: ContentApiClient,
  lang: LanguageCode,
): Promise<DonationSummary> {
  return client.donations.getSummary(lang, {
    next: {
      revalidate: DONATION_REVALIDATE_SECONDS,
      tags: [CONTENT_CACHE_TAGS.donation],
    },
  });
}

/**
 * Fetches the donation summary, returning `undefined` when the Content API is
 * unreachable so the donation page can degrade gracefully instead of failing
 * the whole render.
 */
export async function getDonationSummary(
  lang: LanguageCode,
): Promise<DonationSummary | undefined> {
  try {
    return await fetchDonationSummary(createAppContentClient(), lang);
  } catch {
    return undefined;
  }
}
