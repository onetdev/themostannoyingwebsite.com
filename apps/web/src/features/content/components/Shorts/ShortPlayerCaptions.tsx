'use client';

import type { ShortCue } from '@maw/content-sdk';
import { useEffect, useState } from 'react';

export interface ShortPlayerCaptionsProps {
  cues: ShortCue[];
  video: HTMLVideoElement | null;
  visible: boolean;
}

function findActiveCue(
  cues: ShortCue[],
  currentTimeMs: number,
): ShortCue | undefined {
  return cues.find(
    (cue) => currentTimeMs >= cue.start_ms && currentTimeMs < cue.end_ms,
  );
}

/**
 * Top-positioned subtitle overlay.
 *
 * The API already returns localized, shot-aligned cues, so the player renders
 * them directly instead of relying on the browser's bottom-anchored native
 * VTT captions.
 */
export function ShortPlayerCaptions({
  cues,
  video,
  visible,
}: ShortPlayerCaptionsProps) {
  const [activeCue, setActiveCue] = useState<ShortCue>();

  useEffect(() => {
    if (!visible || !video) {
      setActiveCue(undefined);
      return;
    }

    const sync = () => {
      const next = findActiveCue(cues, video.currentTime * 1000);
      setActiveCue((previous) =>
        previous?.text === next?.text ? previous : next,
      );
    };

    video.addEventListener('timeupdate', sync);
    video.addEventListener('seeked', sync);
    video.addEventListener('loadedmetadata', sync);
    sync();

    return () => {
      video.removeEventListener('timeupdate', sync);
      video.removeEventListener('seeked', sync);
      video.removeEventListener('loadedmetadata', sync);
    };
  }, [cues, video, visible]);

  if (!visible || !activeCue) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-32 z-20 flex justify-center px-6"
      data-testid="short-captions"
    >
      <p className="max-w-[80%] rounded-md bg-black/45 px-3 py-1.5 text-center text-base font-medium whitespace-pre-line text-white shadow-md backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
        {activeCue.text}
      </p>
    </div>
  );
}
