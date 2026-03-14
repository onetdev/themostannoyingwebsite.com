'use client';

import { useEffect } from 'react';
import { useDynamicPageTitle } from './useDynamicPageTitle';

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
  const { setTitle, resetTitle } = useDynamicPageTitle(enabled);

  useEffect(() => {
    if (!enabled) return;

    let time = 0;
    const timer = setInterval(() => {
      time += 1;
      const alternate = time % 2 === 1;
      if (alternate) {
        resetTitle();
      } else {
        const text = texts[Math.floor(time / 2) % texts.length];
        if (text) {
          setTitle(text);
        }
      }
    }, speedMs);

    return () => {
      resetTitle();
      clearInterval(timer);
    };
  }, [enabled, speedMs, texts, setTitle, resetTitle]);
}
