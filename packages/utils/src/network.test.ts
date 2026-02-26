import { fetchWithTimeout } from './network';

describe('network utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
    global.AbortController = jest.fn().mockImplementation(() => ({
      abort: jest.fn(),
      signal: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should resolve if fetch succeeds within timeout', async () => {
    const mockResponse = { ok: true };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const promise = fetchWithTimeout('http://example.com', { timeout: 1000 });
    const result = await promise;

    expect(result).toBe(mockResponse);
  });

  test('should reject if fetch times out', async () => {
    // A promise that never resolves
    (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));

    const promise = fetchWithTimeout('http://example.com', { timeout: 1000 });

    jest.advanceTimersByTime(1001);

    await expect(promise).rejects.toThrow(
      'Fetch request timed out after 1000ms',
    );
  });
});
