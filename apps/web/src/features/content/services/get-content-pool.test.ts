import type { ContentApiClient } from '@maw/content-sdk';
import { fetchContentPool, getContentPool } from './get-content-pool';

const UPDATED_AT = '2026-09-01T00:00:00.000Z';

function clientWith(overrides: Record<string, unknown>): ContentApiClient {
  return overrides as unknown as ContentApiClient;
}

describe('getContentPool', () => {
  it('reads a generic string pool', async () => {
    const client = clientWith({
      pools: {
        getByType: async () => ({ items: ['A', 'B'], updated_at: UPDATED_AT }),
      },
    });

    await expect(getContentPool(client, 'en', 'names')).resolves.toEqual({
      items: ['A', 'B'],
      updatedAt: UPDATED_AT,
    });
  });

  it('reads a dedicated survey resource', async () => {
    const questions = [
      {
        id: 'sqrt144',
        text: 'What is the square root of 144?',
        options: [{ id: 'o1', label: '12' }],
        solution: 'o1',
      },
    ];
    const client = clientWith({
      survey: {
        getQuestions: async () => ({ questions, updated_at: UPDATED_AT }),
      },
    });

    await expect(getContentPool(client, 'en', 'survey')).resolves.toEqual({
      items: questions,
      updatedAt: UPDATED_AT,
    });
  });

  it('reads a dedicated prize wheel resource', async () => {
    const segments = [
      { id: 'worldPeace', label: 'World peace', weight: 1, starred: true },
    ];
    const client = clientWith({
      prizeWheel: {
        getSegments: async () => ({ segments, updated_at: UPDATED_AT }),
      },
    });

    await expect(getContentPool(client, 'en', 'prize-wheel')).resolves.toEqual({
      items: segments,
      updatedAt: UPDATED_AT,
    });
  });

  it('returns undefined when the request fails', async () => {
    const client = clientWith({
      pools: {
        getByType: async () => {
          throw new Error('network down');
        },
      },
    });

    await expect(
      getContentPool(client, 'en', 'names'),
    ).resolves.toBeUndefined();
  });
});

describe('fetchContentPool', () => {
  it('rethrows when the request fails', async () => {
    const client = clientWith({
      pools: {
        getByType: async () => {
          throw new Error('network down');
        },
      },
    });

    await expect(fetchContentPool(client, 'en', 'names')).rejects.toThrow(
      'network down',
    );
  });
});
