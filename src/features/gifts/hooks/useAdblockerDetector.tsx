import { useEffect } from 'react';

import { useRuntimeStore } from '@/lib/state/runtime';
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

    return contentLength === null || parseInt(contentLength) > 6666;
  } catch {
    return false;
  }
};

const useAdblockerDetector = () => {
  const setAdblockerSuspect = useRuntimeStore(
    (state) => state.setAdblockerSuspected,
  );

  useEffect(() => {
    testFileLoader().then(setAdblockerSuspect);
  }, [setAdblockerSuspect]);
};

export default useAdblockerDetector;
