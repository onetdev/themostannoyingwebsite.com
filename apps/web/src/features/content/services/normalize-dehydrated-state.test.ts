import { dehydrate, QueryClient } from '@tanstack/react-query';
import { normalizeDehydratedState } from './normalize-dehydrated-state';

async function buildState(timestamp: number) {
  jest.setSystemTime(timestamp);

  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ['content-pools', 'en', 'names'],
    queryFn: async () => ['Alice', 'Bob'],
  });

  return dehydrate(client);
}

describe('normalizeDehydratedState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('removes render-time timestamps from dehydrated queries', async () => {
    const state = normalizeDehydratedState(
      await buildState(new Date('2026-10-20T12:00:00.000Z').getTime()),
    );

    expect(state.queries).toHaveLength(1);
    expect(state.queries[0]?.dehydratedAt).toBe(0);
    expect(state.queries[0]?.state.dataUpdatedAt).toBe(0);
  });

  it('produces identical output for renders at different times', async () => {
    const first = normalizeDehydratedState(
      await buildState(new Date('2026-10-20T12:00:00.000Z').getTime()),
    );
    const second = normalizeDehydratedState(
      await buildState(new Date('2026-10-21T18:30:00.000Z').getTime()),
    );

    expect(first).toEqual(second);
  });
});
