import 'server-only';

import {
  CONTENT_CACHE_TAGS,
  type ContentApiClient,
  type CurrencyRatesResponse,
} from '@maw/content-sdk';
import { createAppContentClient } from '@/core/content';

const CURRENCY_REVALIDATE_SECONDS = 1800;

/**
 * Fetches the exchange rates from the Content API with the currency cache tag.
 * Throws when the request fails; use {@link getCurrencyRates} for the graceful
 * variant.
 */
export async function fetchCurrencyRates(
  client: ContentApiClient,
): Promise<CurrencyRatesResponse> {
  return client.currency.getRates({
    next: {
      revalidate: CURRENCY_REVALIDATE_SECONDS,
      tags: [CONTENT_CACHE_TAGS.currency],
    },
  });
}

/**
 * Fetches the exchange rates, returning `undefined` when the Content API is
 * unreachable so the donation page can degrade to its bundled seed rates
 * instead of failing the whole render.
 */
export async function getCurrencyRates(): Promise<
  CurrencyRatesResponse | undefined
> {
  try {
    return await fetchCurrencyRates(createAppContentClient());
  } catch {
    return undefined;
  }
}
