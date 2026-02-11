import { useEffect, useState } from 'react';

import { usePainPreferencesStore } from '@/kernel';

// This NEEDS user interaction first, otherwise it won't work at all.
// Also, this can't really have a cleanup function either.
export function useDisableNavigationPop() {
  const [isInited, setIsInited] = useState(false);
  const enabled = usePainPreferencesStore((state) => state.flags.historySpam);

  // const onPopState = useCallback((event: PopStateEvent) => {
  //   const prevent = event.state && event.state.preventNavigation;
  //   if (prevent) {
  //     history.pushState(event.state, '', location.pathname);
  //     console.log('Back navigation is blocked!');
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isInited || !enabled) return;

    setIsInited(true);

    const hashValuesToSkip = [undefined, '', '#'];
    if (hashValuesToSkip.includes(window.location.hash)) {
      const urls = [
        `${location.pathname}#hey-back-nav-blocked-nyenyenye`,
        `${location.pathname}#footer`,
        `${location.pathname}#header`,
        location.pathname,
      ];

      urls.map((url) => history.pushState(window.history.state, '', url));
    }
  }, [enabled, isInited]);

  // useEffect(() => {
  //   // This actually doesn't work properly. After first interaction the pop
  //   // seems to get blocked but then the game stops.
  //   window.addEventListener('popstate', onPopState);
  //   return () => window.removeEventListener('popstate', onPopState);
  // }, [onPopState]);
}
