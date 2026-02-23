'use client';

import { useEffect, useState } from 'react';

import { fetchWithTimeout } from '@/core/infrastructure/utils/network';
import {
  usePainPreferencesStore,
  useRuntimeStore,
  useUserGrantsStore,
} from '@/stores';

const testFileLoader = async () => {
  // In head mode without initialisation adsense should not touch cookies
  // and local storage either
  const url = ' https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  // const url = 'ads/ads.js'

  try {
    const result = await fetchWithTimeout(url, {
      method: 'HEAD',
    });

    const contentLength = result.headers.get('content-length');

    return contentLength === null || parseInt(contentLength) < 6666;
  } catch {
    return false;
  }
};

export const useAdblockerDetector = () => {
  const [cached, setSetcached] = useState<boolean>();
  const setAdblockerSuspect = useRuntimeStore(
    (state) => state.setAdblockerSuspected,
  );
  const ppReviewed = useUserGrantsStore((state) => state.reviewCompleted);
  const enabled = usePainPreferencesStore(
    (state) => state.flags['gifts.detectAdblocker'],
  );

  useEffect(() => {
    if (!ppReviewed || !enabled) {
      setAdblockerSuspect(null);
      return;
    }

    if (cached !== undefined) {
      setAdblockerSuspect(cached);
    } else {
      testFileLoader().then((value) => {
        setSetcached(value);
        setAdblockerSuspect(value);
      });
    }
  }, [ppReviewed, enabled, cached, setAdblockerSuspect]);
};
