/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';

import { useShareAction } from './useShareAction';

const showShareModal = jest.fn();
const mockTrack = jest.fn();

jest.mock('@/core/telemetry', () => ({
  track: (...args: unknown[]) => mockTrack(...args),
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { showShareModal: typeof showShareModal }) => unknown,
  ) => selector({ showShareModal }),
}));

const setNativeShare = (value: unknown) => {
  Object.defineProperty(navigator, 'share', {
    value,
    configurable: true,
    writable: true,
  });
};

describe('useShareAction', () => {
  beforeEach(() => {
    showShareModal.mockClear();
    mockTrack.mockClear();
    setNativeShare(undefined);
  });

  afterEach(() => {
    setNativeShare(undefined);
    jest.restoreAllMocks();
  });

  it('uses the native share sheet when available', async () => {
    const share = jest.fn().mockResolvedValue(undefined);
    setNativeShare(share);

    const { result } = renderHook(() => useShareAction());
    await act(async () => {
      await result.current({
        url: 'https://example.com/a',
        title: 'Hello',
        surface: 'content:article',
      });
    });

    expect(share).toHaveBeenCalledWith({
      title: 'Hello',
      text: undefined,
      url: 'https://example.com/a',
    });
    expect(showShareModal).not.toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith('ui.share', {
      channel: 'native',
      surface: 'content:article',
    });
  });

  it('falls back to the modal when the native sheet is unavailable', async () => {
    const { result } = renderHook(() => useShareAction());
    await act(async () => {
      await result.current({
        url: 'https://example.com/a',
        surface: 'content:article',
      });
    });

    expect(showShareModal).toHaveBeenCalledWith('https://example.com/a');
    expect(mockTrack).toHaveBeenCalledWith('ui.share', {
      channel: 'modal',
      surface: 'content:article',
    });
  });

  it('does not open the modal when the user dismisses the native sheet', async () => {
    setNativeShare(
      jest.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError')),
    );

    const { result } = renderHook(() => useShareAction());
    await act(async () => {
      await result.current({ url: 'https://example.com/a' });
    });

    expect(showShareModal).not.toHaveBeenCalled();
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('falls back to the modal when the native sheet fails', async () => {
    setNativeShare(jest.fn().mockRejectedValue(new Error('nope')));

    const { result } = renderHook(() => useShareAction());
    await act(async () => {
      await result.current({ url: 'https://example.com/a' });
    });

    expect(showShareModal).toHaveBeenCalledWith('https://example.com/a');
  });
});
