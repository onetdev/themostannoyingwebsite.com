import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';

const useNavigationStats = () => {
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

export default useNavigationStats;
