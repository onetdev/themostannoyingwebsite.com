import type { APIRequestContext } from '@playwright/test';

import { resolveContentApiBaseUrl } from '@/core/content';

export interface FirstShort {
  slug: string;
  title: string;
  ai_assisted: boolean;
  author: {
    slug: string;
    name: string;
  };
}

/**
 * Resolves a real short from the Content API so specs that need the shorts
 * endpoint can skip themselves while it is unavailable.
 */
export async function fetchFirstShort(
  request: APIRequestContext,
): Promise<FirstShort | undefined> {
  const response = await request.get(
    `${resolveContentApiBaseUrl()}/api/v1/short-videos?lang=en&limit=1`,
  );

  if (!response.ok()) {
    return undefined;
  }

  const data = (await response.json()) as { items: FirstShort[] };

  return data.items[0];
}
