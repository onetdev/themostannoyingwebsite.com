import { useEffect, useState, useRef } from 'react';

/**
 * Allows to play audio files after the first user interaction has happened
 * othwerwise the audio will not be played and an exception will be thrown.
 *   NotAllowedError: The play method is not allowed by the user agent or
 *   the platform in the current context, possibly because the user denied
 *   permission.
 */
const useAudio = (url: string) => {
  const audio = useRef<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying((prev) => !prev);
  const play = () => setPlaying(true);

  useEffect(() => {
    if (playing) {
      audio.current?.play();
    } else {
      audio.current?.pause();
    }
  }, [audio, playing]);

  useEffect(() => {
    const audioInstance = new Audio(url);
    audio.current = audioInstance;
    audio.current?.addEventListener('ended', () => setPlaying(false));

    return () => {
      audioInstance?.pause();
      audio.current?.removeEventListener('ended', () => setPlaying(false));
      audio.current = undefined;
    };
  }, [url]);

  return {
    playing,
    toggle,
    play,
  };
};

export default useAudio;
