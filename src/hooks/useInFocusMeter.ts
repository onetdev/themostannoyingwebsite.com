import { useEffect, useState } from 'react';

import { PersistedStoreType } from '@/redux/store';
import { setInFocusSeconds, setIsInFocus } from '@/redux/stores/runtime';

/**
 * This will mesaure how long the webpage has been in focus and report it to
 * the redux store.
 */
const useInFocusMeter = (store: PersistedStoreType) => {
  const [isInFocus, setIsInFocusInternal] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const handleFocus = () => setIsInFocusInternal(true);
  const handleBlur = () => setIsInFocusInternal(false);

  useEffect(() => {
    document.addEventListener('focus', handleFocus);
    document.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('focus', handleFocus);
      document.addEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    store.dispatch(setIsInFocus(isInFocus));
  }, [isInFocus, store]);

  useEffect(() => {
    if (!isInFocus) {
      return;
    }

    const interval = setInterval(() => {
      // TODO: Broadcasting this will force the whole screen to rerender
      // which is unacceptable. Try solve this or even move runtime stuff
      // into a separate store, hook.
      store.dispatch(setInFocusSeconds(elapsed + 1));
      setElapsed(elapsed + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isInFocus, elapsed, store]);
};

export default useInFocusMeter;
