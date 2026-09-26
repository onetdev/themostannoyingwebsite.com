import { createAppContentClient } from '@/core/content';
import { fetchVariantPool } from './get-variant-pool';
import {
  variantPoolQueryKey,
  variantPoolQueryOptions,
} from './variant-pool-query';

jest.mock('@/core/content', () => ({
  createAppContentClient: jest.fn(() => ({})),
}));

jest.mock('./get-variant-pool', () => ({
  fetchVariantPool: jest.fn(),
}));

const fetchVariantPoolMock = jest.mocked(fetchVariantPool);
const createClientMock = jest.mocked(createAppContentClient);

describe('variantPoolQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds a stable key from locale and pool type', () => {
    expect(variantPoolQueryKey('en', 'names')).toEqual([
      'variants',
      'en',
      'names',
    ]);
  });

  it('never marks the hydrated pool as stale', () => {
    const options = variantPoolQueryOptions<string>('en', 'names');

    expect(options.staleTime).toBe(Number.POSITIVE_INFINITY);
    expect(options.gcTime).toBe(Number.POSITIVE_INFINITY);
  });

  it('refuses to run in the browser', async () => {
    const originalWindow = (globalThis as { window?: unknown }).window;
    Object.defineProperty(globalThis, 'window', {
      value: {},
      configurable: true,
      writable: true,
    });

    try {
      const options = variantPoolQueryOptions<string>('en', 'names');

      await expect(
        (options.queryFn as () => Promise<unknown>)(),
      ).rejects.toThrow(/browser/);
      expect(createClientMock).not.toHaveBeenCalled();
    } finally {
      if (originalWindow === undefined) {
        Reflect.deleteProperty(globalThis, 'window');
      } else {
        Object.defineProperty(globalThis, 'window', {
          value: originalWindow,
          configurable: true,
          writable: true,
        });
      }
    }
  });

  it('fetches the pool on the server', async () => {
    const originalWindow = (globalThis as { window?: unknown }).window;
    Reflect.deleteProperty(globalThis, 'window');

    try {
      fetchVariantPoolMock.mockResolvedValue({
        items: ['A', 'B'],
        updatedAt: '2026-09-01T00:00:00.000Z',
      });

      const options = variantPoolQueryOptions<string>('en', 'names');

      await expect(
        (options.queryFn as () => Promise<unknown>)(),
      ).resolves.toEqual(['A', 'B']);
      expect(fetchVariantPoolMock).toHaveBeenCalledWith(
        expect.anything(),
        'en',
        'names',
      );
    } finally {
      if (originalWindow !== undefined) {
        Object.defineProperty(globalThis, 'window', {
          value: originalWindow,
          configurable: true,
          writable: true,
        });
      }
    }
  });
});
