/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useVideoTime } from './use-video-time';

function makeVideo(currentTime = 0) {
  const video = document.createElement('video');
  Object.defineProperty(video, 'currentTime', {
    configurable: true,
    value: currentTime,
    writable: true,
  });

  return video;
}

describe('useVideoTime', () => {
  it('reads the position in milliseconds and follows playback events', () => {
    const video = makeVideo(1.5);
    const { result } = renderHook(() => useVideoTime(video));

    expect(result.current).toBe(1500);

    video.currentTime = 3;
    act(() => {
      video.dispatchEvent(new Event('timeupdate'));
    });

    expect(result.current).toBe(3000);
  });

  it('re-reads the position after a seek', () => {
    const video = makeVideo(0);
    const { result } = renderHook(() => useVideoTime(video));

    video.currentTime = 4.25;
    act(() => {
      video.dispatchEvent(new Event('seeked'));
    });

    expect(result.current).toBe(4250);
  });

  it('stays at zero without a video', () => {
    const { result } = renderHook(() => useVideoTime(null));

    expect(result.current).toBe(0);
  });
});
