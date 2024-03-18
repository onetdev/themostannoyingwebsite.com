import { useCallback, useEffect, useState } from 'react';

import { PersistedStoreType } from '@/redux/store';
import { setHasInteracted } from '@/redux/slices/runtime';

/**
 * Some browsers will limit features until the first user interaction has
 * occured.
 */
const useFirstInteraction = (store: PersistedStoreType) => {
  const [completed, setCompleted] = useState(false);

  const handleInteraction = useCallback(() => {
    if (completed) return;
    setCompleted(true);
    store.dispatch(setHasInteracted());
  }, [completed, store]);

  useEffect(() => {
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.addEventListener('touchend', handleInteraction);
    };
  }, [handleInteraction]);
};

export default useFirstInteraction;
