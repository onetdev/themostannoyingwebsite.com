'use client';

import { useEffect, useState } from 'react';
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
  }, [incrementNavigationCount, pathName]);

  return navigationCount;
};
