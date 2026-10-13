'use client';

import { useEffect } from 'react';

import {
  usePainPreferencesStore,
  useRuntimeStore,
  useUserGrantsStore,
} from '@/stores';
import { detectAdblocker } from '../services/adblocker-detection';

export const useAdblockerDetector = () => {
  const setAdblockerSuspect = useRuntimeStore(
    (state) => state.setAdblockerSuspected,
  );
  const ppReviewed = useUserGrantsStore((state) => state.reviewCompleted);
  const enabled = usePainPreferencesStore(
    (state) => state.flags['promotions.detectAdblocker'],
  );

  useEffect(() => {
    if (!ppReviewed || !enabled) {
      setAdblockerSuspect(null);
      return;
    }

    let cancelled = false;

    detectAdblocker().then((suspected) => {
      if (!cancelled) {
        setAdblockerSuspect(suspected);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [ppReviewed, enabled, setAdblockerSuspect]);
};
