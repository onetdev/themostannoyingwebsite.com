'use client';

import { useAudio as useAudioReactUse } from 'react-use';
import { useUserPreferencesStore } from '@/stores';

/**
 * Wrapper for react-use useAudio that handles checking if sound is enabled
 * in user preferences before playing.
 */
export const useAudio = (url: string) => {
  const enableSound = useUserPreferencesStore((state) => state.enableSound);
  const [audio, state, controls] = useAudioReactUse({ src: url });

  const play = () => {
    if (enableSound) {
      controls.play();
    }
  };

  const toggle = () => {
    if (state.playing) {
      controls.pause();
    } else if (enableSound) {
      controls.play();
    }
  };

  return {
    audio,
    state,
    controls,
    // Helper shortcuts
    play,
    toggle,
    playing: state.playing,
  };
};
