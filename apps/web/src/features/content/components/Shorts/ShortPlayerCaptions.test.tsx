/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import type { ShortVideoCue } from '@maw/content-sdk';
import { act, render, screen } from '@testing-library/react';

import { ShortPlayerCaptions } from './ShortPlayerCaptions';

const cues: ShortVideoCue[] = [
  {
    shot_id: 'shot-1',
    start_ms: 0,
    end_ms: 2500,
    text: '♪ cheerful xylophone ♪',
  },
  { shot_id: 'shot-1', start_ms: 2500, end_ms: 4000, text: '[metallic slam]' },
  { shot_id: 'shot-2', start_ms: 4000, end_ms: 5500, text: '[jam splatters]' },
];

function makeVideo(currentTime: number) {
  const video = document.createElement('video');
  Object.defineProperty(video, 'currentTime', {
    configurable: true,
    value: currentTime,
    writable: true,
  });
  return video;
}

describe('ShortPlayerCaptions', () => {
  it('shows the cue that matches the current playback time', () => {
    const video = makeVideo(3);
    render(<ShortPlayerCaptions cues={cues} video={video} visible />);

    expect(screen.getByTestId('short-captions')).toHaveTextContent(
      '[metallic slam]',
    );
  });

  it('updates when playback advances to the next cue', () => {
    const video = makeVideo(1);
    render(<ShortPlayerCaptions cues={cues} video={video} visible />);

    expect(screen.getByTestId('short-captions')).toHaveTextContent(
      '♪ cheerful xylophone ♪',
    );

    video.currentTime = 4.5;
    act(() => {
      video.dispatchEvent(new Event('timeupdate'));
    });

    expect(screen.getByTestId('short-captions')).toHaveTextContent(
      '[jam splatters]',
    );
  });

  it('renders nothing when captions are disabled', () => {
    const video = makeVideo(1);
    render(<ShortPlayerCaptions cues={cues} video={video} visible={false} />);

    expect(screen.queryByTestId('short-captions')).not.toBeInTheDocument();
  });
});
