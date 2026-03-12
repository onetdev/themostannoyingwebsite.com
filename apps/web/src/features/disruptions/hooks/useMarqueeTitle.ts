'use client';

import { useEffect } from 'react';
import { string_marquee } from '../utils';
import { useDynamicPageTitle } from './useDynamicPageTitle';

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
  const { setTitle, resetTitle } = useDynamicPageTitle(enabled);

  useEffect(() => {
    if (!enabled) return;

    let time = 0;
    const timer = setInterval(() => {
      time += 1;
      setTitle(string_marquee(text, time));
    }, speedMs);

    return () => {
      clearInterval(timer);
      resetTitle();
    };
  }, [enabled, speedMs, text, setTitle, resetTitle]);
}
