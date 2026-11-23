import type { APIRequestContext } from '@playwright/test';

const contentApiBaseUrl =
  process.env.NEXT_PUBLIC_CONTENT_API_URL ??
  'https://content.themostannoyingwebsite.com';

export interface FirstShort {
  slug: string;
  title: string;
  ai_assisted: boolean;
}

/**
 * Resolves a real short from the Content API so specs that need the shorts
 * endpoint can skip themselves while it is unavailable.
 */
export async function fetchFirstShort(
  request: APIRequestContext,
): Promise<FirstShort | undefined> {
  const response = await request.get(
    `${contentApiBaseUrl}/api/v1/shorts?lang=en&limit=1`,
  );

  if (!response.ok()) {
    return undefined;
  }

  const data = (await response.json()) as { items: FirstShort[] };

  return data.items[0];
}
