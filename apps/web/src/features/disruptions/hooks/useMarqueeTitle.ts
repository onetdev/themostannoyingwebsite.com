'use client';

import { useEffect } from 'react';
import { string_marquee } from '../utils';
import { useDynamicTitle } from './useDynamicTitle';

export type UseMarqueeTitleOptions = {
  enabled: boolean;
  speedMs?: number;
  text: string;
};

export function useMarqueeTitle({
  enabled,
  speedMs = 1000,
  text,
}: UseMarqueeTitleOptions) {
  const { setTitle } = useDynamicTitle(enabled);

  useEffect(() => {
    if (!enabled) return;

    let time = 0;
    const timer = setInterval(() => {
      time += 1;
      setTitle(string_marquee(text, time));
    }, speedMs);

    return () => clearInterval(timer);
  }, [enabled, speedMs, text, setTitle]);
}
