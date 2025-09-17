import { useCallback, useEffect } from 'react';

import { useRuntimeStore } from '@/kernel';

const useReducedMotionListener = () => {
  const setStoreState = useRuntimeStore((state) => state.setReducedMotion);

  const onChange = useCallback(
    (e: MediaQueryListEvent) => setStoreState(!e.matches),
    [setStoreState],
  );

  useEffect(() => {
    const watcher = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStoreState(watcher.matches);

    watcher.addEventListener('change', onChange);
    return () => watcher.removeEventListener('change', onChange);
  }, [onChange, setStoreState]);
};

export default useReducedMotionListener;
