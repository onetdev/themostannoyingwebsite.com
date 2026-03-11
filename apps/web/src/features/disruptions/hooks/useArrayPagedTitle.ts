'use client';

import { useEffect } from 'react';
import { useDynamicTitle } from './useDynamicTitle';

export type UseArrayPagedTitleOptions = {
  enabled: boolean;
  speedMs?: number;
  texts: string[];
};

export function useArrayPagedTitle({
  enabled,
  speedMs = 1000,
  texts,
}: UseArrayPagedTitleOptions) {
  const { setTitle, originalTitle } = useDynamicTitle(enabled);

  useEffect(() => {
    if (!enabled) return;

    let time = 0;
    const timer = setInterval(() => {
      time += 1;
      const alternate = time % 2 === 1;
      const text = alternate
        ? originalTitle
        : texts[Math.floor(time / 2) % texts.length];
      if (text) {
        setTitle(text);
      }
    }, speedMs);

    return () => clearInterval(timer);
  }, [enabled, speedMs, texts, setTitle, originalTitle]);
}
