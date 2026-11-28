/**
 * @jest-environment jsdom
 */
import {
  clearMediaSession,
  releaseMediaElement,
  releaseMediaElements,
} from './media-teardown';

function makeMedia() {
  const media = document.createElement('video');
  media.pause = jest.fn();
  media.load = jest.fn();
  return media;
}

describe('releaseMediaElement', () => {
  it('pauses, clears the source, and reloads', () => {
    const media = makeMedia();
    media.setAttribute('src', 'clip.mp4');

    releaseMediaElement(media);

    expect(media.pause).toHaveBeenCalledTimes(1);
    expect(media.hasAttribute('src')).toBe(false);
    expect(media.load).toHaveBeenCalledTimes(1);
  });

  it('stops attached stream tracks and clears the stream', () => {
    const media = makeMedia();
    const track = { stop: jest.fn() };
    const stream = {
      getTracks: () => [track],
    } as unknown as MediaStream;
    Object.defineProperty(media, 'srcObject', {
      configurable: true,
      value: stream,
      writable: true,
    });

    releaseMediaElement(media);

    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(media.srcObject).toBeNull();
  });
});

describe('releaseMediaElements', () => {
  it('releases every element in the collection', () => {
    const first = makeMedia();
    const second = makeMedia();

    releaseMediaElements([first, second]);

    expect(first.pause).toHaveBeenCalledTimes(1);
    expect(second.pause).toHaveBeenCalledTimes(1);
  });
});

describe('clearMediaSession', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'mediaSession');
  });

  it('marks playback as none and clears metadata', () => {
    const mediaSession = {
      playbackState: 'playing',
      metadata: { title: 'Short' },
    };
    Object.defineProperty(navigator, 'mediaSession', {
      configurable: true,
      value: mediaSession,
    });

    clearMediaSession();

    expect(mediaSession.playbackState).toBe('none');
    expect(mediaSession.metadata).toBeNull();
  });

  it('is a no-op when the media session API is unavailable', () => {
    expect(() => clearMediaSession()).not.toThrow();
  });
});
