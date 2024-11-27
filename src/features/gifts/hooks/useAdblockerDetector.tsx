import { useEffect } from 'react';

import { useRuntimeStore } from '@/lib/state/runtime';
import { fetchWithTimeout } from '@/lib/utils/network';

const testFileLoader = async () => {
  try {
    const result = await fetchWithTimeout('/ads.js', {
      method: 'HEAD',
    });

    const contentLength = result.headers.get('content-length');

    console.log(contentLength);
    return contentLength === null || !(parseInt(contentLength) > 166);
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
