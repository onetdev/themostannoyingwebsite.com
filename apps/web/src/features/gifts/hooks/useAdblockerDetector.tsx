import { useEffect, useState } from 'react';

import { useExperienceFlagsStore } from '@/root/apps/web/src/lib/state/experience_flags';
import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';
import { useUserGrantsStore } from '@/root/apps/web/src/lib/state/user_grants';
import { fetchWithTimeout } from '@/root/apps/web/src/lib/utils/network';

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

const useAdblockerDetector = () => {
  const [cached, setSetcached] = useState<boolean>();
  const setAdblockerSuspect = useRuntimeStore(
    (state) => state.setAdblockerSuspected,
  );
  const ppReviewed = useUserGrantsStore((state) => state.reviewCompleted);
  const enabled = useExperienceFlagsStore(
    (state) => state.gifts.detectAdblocker,
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

export default useAdblockerDetector;
