'use client';

import { useEffect, useState } from 'react';
import { emit } from '@/eventBus';
import { usePathname } from '@/i18n/navigation';
import { useRuntimeStore } from '@/stores';

export const useNavigationStats = () => {
  const incrementNavigationCount = useRuntimeStore(
    (state) => state.incrementNavigationCount,
  );
  const [navigationCount, setNavigationCount] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    setNavigationCount((prevCount) => prevCount + 1);
    incrementNavigationCount();
    emit('navigation:changed', { path: pathName });
  }, [incrementNavigationCount, pathName]);

  return navigationCount;
};
