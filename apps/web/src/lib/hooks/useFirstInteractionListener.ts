import { useCallback, useEffect } from 'react';

import { useRuntimeStore } from '@/root/apps/web/src/lib/state/runtime';

/**
 * Some browsers will limit features until the first user interaction has
 * occured. This is really important because some of the browser features
 * won't work until the user has interacted with the page (eg audio).
 */
const useFirstInteractionListener = () => {
  const completed = useRuntimeStore((state) => state.interactionUnlocked);
  const markInteractionUnlocked = useRuntimeStore(
    (state) => state.markInteractionUnlocked,
  );

  const handleInteraction = useCallback(() => {
    if (completed) return;

    markInteractionUnlocked();
  }, [completed, markInteractionUnlocked]);

  useEffect(() => {
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.addEventListener('touchend', handleInteraction);
    };
  }, [handleInteraction]);
};

export default useFirstInteractionListener;
