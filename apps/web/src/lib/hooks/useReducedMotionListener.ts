import { useCallback, useEffect } from 'react';

import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';

const useReducedMotionListener = () => {
  const setStoreState = useRuntimeStore((state) => state.setReducedMotion);

  const onChangce = useCallback(
    (e: MediaQueryListEvent) => setStoreState(!e.matches),
    [setStoreState],
  );

  useEffect(() => {
    const watcher = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStoreState(watcher.matches);

    watcher.addEventListener('change', onChangce);
    return () => watcher.removeEventListener('change', onChangce);
  }, [onChangce, setStoreState]);
};

export default useReducedMotionListener;
