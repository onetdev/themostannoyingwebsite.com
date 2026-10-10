/**
 * @jest-environment jsdom
 */
import {
  detectAdblocker,
  detectCosmeticBlocking,
  detectNetworkBlocking,
} from './adblocker-detection';

describe('detectNetworkBlocking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('reports no blocking when the bait loads normally', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    await expect(detectNetworkBlocking()).resolves.toBe(false);
  });

  it('reports blocking on a non-OK response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(detectNetworkBlocking()).resolves.toBe(true);
  });

  it('reports blocking when the request is rejected', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('blocked'));

    await expect(detectNetworkBlocking()).resolves.toBe(true);
  });
});

describe('detectCosmeticBlocking', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns false when the canary is visible', () => {
    expect(detectCosmeticBlocking(document)).toBe(false);
  });

  it('returns true when a cosmetic filter hides the canary', () => {
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      display: 'none',
      visibility: 'visible',
      opacity: '1',
    } as unknown as CSSStyleDeclaration);

    expect(detectCosmeticBlocking(document)).toBe(true);
  });

  it('removes the canaries after probing', () => {
    detectCosmeticBlocking(document);

    expect(document.getElementById('ad-slot')).toBeNull();
    expect(document.getElementById('cmplz-cookiebanner-container')).toBeNull();
  });

  it('returns false when there is no document to probe', () => {
    expect(detectCosmeticBlocking({} as Document)).toBe(false);
  });
});

describe('detectAdblocker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('short-circuits when the cosmetic canary is hidden', async () => {
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      display: 'none',
      visibility: 'visible',
      opacity: '1',
    } as unknown as CSSStyleDeclaration);

    await expect(detectAdblocker()).resolves.toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('falls back to the network probe', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(detectAdblocker()).resolves.toBe(true);
  });
});
