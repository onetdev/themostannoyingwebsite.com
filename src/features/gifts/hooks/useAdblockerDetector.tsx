import { useEffect } from 'react';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';
import { useUserGrantsStore } from '@/lib/state/user_grants';
import { fetchWithTimeout } from '@/lib/utils/network';

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
  const setAdblockerSuspect = useRuntimeStore(
    (state) => state.setAdblockerSuspected,
  );
  const cookieConsent = useUserGrantsStore((state) => state.cookies.essential);
  const enabled = useExperienceFlagsStore(
    (state) => state.gifts.detectAdblocker,
  );

  useEffect(() => {
    if (!cookieConsent || !enabled) return;

    testFileLoader().then(setAdblockerSuspect);
  }, [cookieConsent, enabled, setAdblockerSuspect]);
};

export default useAdblockerDetector;
