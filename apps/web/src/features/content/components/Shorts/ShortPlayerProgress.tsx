'use client';

import { Slider } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export interface ShortPlayerProgressProps {
  video: HTMLVideoElement | null;
  durationMs: number;
}

/**
 * Seekable progress bar for the active clip.
 *
 * Owns its own time state so `timeupdate` never re-renders the whole feed.
 */
export function ShortPlayerProgress({
  video,
  durationMs,
}: ShortPlayerProgressProps) {
  const t = useTranslations('content.shorts');
  const [currentMs, setCurrentMs] = useState(0);

  useEffect(() => {
    if (!video) {
      setCurrentMs(0);
      return;
    }

    const sync = () => {
      const next = Math.min(video.currentTime * 1000, durationMs);
      setCurrentMs(Number.isFinite(next) ? next : 0);
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
  }, [video, durationMs]);

  const onSeek = (value: number | readonly number[]) => {
    if (!video) {
      return;
    }

    const next = typeof value === 'number' ? value : value[0];
    video.currentTime = next / 1000;
    setCurrentMs(next);
  };

  return (
    <Slider
      className="w-full [&_[data-slot=slider-track]]:h-0.5 [&_[data-slot=slider-track]]:bg-white/30 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:size-2.5 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-white"
      min={0}
      max={Math.max(durationMs, 1)}
      value={[currentMs]}
      onValueChange={onSeek}
      aria-label={t('seek')}
      data-track-field="shorts:progress"
    />
  );
}
