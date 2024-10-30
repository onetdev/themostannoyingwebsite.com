import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRuntimeStore } from '@/state/runtime';

const useNavigationStats = () => {
  const incrementNavigationCount = useRuntimeStore(
    (state) => state.incrementNavigationCount,
  );
  const [navigationCount, setNavigationCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setNavigationCount((prevCount) => prevCount + 1);
      incrementNavigationCount();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [incrementNavigationCount, router.events]);

  return navigationCount;
};

export default useNavigationStats;
