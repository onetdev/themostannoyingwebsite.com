import type { ContentApiClient } from '@maw/content-sdk';
import { fetchVariantPool, getVariantPool } from './get-variant-pool';

function createClient(
  getByType: (...args: unknown[]) => Promise<unknown>,
): ContentApiClient {
  return {
    variants: {
      getByType,
    },
  } as unknown as ContentApiClient;
}

describe('getVariantPool', () => {
  it('returns the pool items and updatedAt from the Content API', async () => {
    const client = createClient(async () => ({
      items: ['A', 'B'],
      updated_at: '2026-09-01T00:00:00.000Z',
    }));

    const result = await getVariantPool<string>(client, 'en', 'names');

    expect(result).toEqual({
      items: ['A', 'B'],
      updatedAt: '2026-09-01T00:00:00.000Z',
    });
  });

  it('returns undefined when the Content API request fails', async () => {
    const client = createClient(async () => {
      throw new Error('network down');
    });

    const result = await getVariantPool<string>(client, 'en', 'names');

    expect(result).toBeUndefined();
  });
});

describe('fetchVariantPool', () => {
  it('returns the pool items and updatedAt from the Content API', async () => {
    const client = createClient(async () => ({
      items: ['A', 'B'],
      updated_at: '2026-09-01T00:00:00.000Z',
    }));

    const result = await fetchVariantPool<string>(client, 'en', 'names');

    expect(result).toEqual({
      items: ['A', 'B'],
      updatedAt: '2026-09-01T00:00:00.000Z',
    });
  });

  it('rethrows when the Content API request fails', async () => {
    const client = createClient(async () => {
      throw new Error('network down');
    });

    await expect(
      fetchVariantPool<string>(client, 'en', 'names'),
    ).rejects.toThrow('network down');
  });
});
