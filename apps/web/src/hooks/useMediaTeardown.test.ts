/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import {
  clearMediaSession,
  releaseMediaElement,
} from '@/core/media/media-teardown';
import { useMediaTeardown } from './useMediaTeardown';

jest.mock('@/core/media/media-teardown', () => ({
  clearMediaSession: jest.fn(),
  releaseMediaElement: jest.fn(),
}));

const releaseMock = releaseMediaElement as jest.MockedFunction<
  typeof releaseMediaElement
>;
const clearSessionMock = clearMediaSession as jest.MockedFunction<
  typeof clearMediaSession
>;

function makeMedia() {
  return document.createElement('video');
}

describe('useMediaTeardown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('releases every registered element', () => {
    const first = makeMedia();
    const second = makeMedia();
    const { result } = renderHook(() => useMediaTeardown<string>());

    act(() => {
      result.current.register('first', first);
      result.current.register('second', second);
    });
    act(() => result.current.releaseAll());

    expect(releaseMock).toHaveBeenCalledWith(first);
    expect(releaseMock).toHaveBeenCalledWith(second);
    expect(clearSessionMock).toHaveBeenCalledTimes(1);
  });

  it('releases and forgets an element when its ref clears', () => {
    const media = makeMedia();
    const { result } = renderHook(() => useMediaTeardown<string>());

    act(() => result.current.register('clip', media));
    act(() => result.current.register('clip', null));

    expect(releaseMock).toHaveBeenCalledWith(media);
    expect(result.current.get('clip')).toBeUndefined();
  });

  it('clears the media session after unmount', () => {
    jest.useFakeTimers();
    const { unmount } = renderHook(() => useMediaTeardown<string>());

    unmount();
    act(() => jest.runOnlyPendingTimers());

    expect(clearSessionMock).toHaveBeenCalledTimes(1);
  });
});
