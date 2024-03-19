import { useCallback, useEffect, useState } from 'react';

import { actions as runtimeActions } from '@/redux/slices/runtime';
import { useAppDispatch } from '@/redux/hooks';

/**
 * Some browsers will limit features until the first user interaction has
 * occured.
 */
const useFirstInteraction = () => {
  const [completed, setCompleted] = useState(false);
  const dispatch = useAppDispatch();

  const handleInteraction = useCallback(() => {
    if (completed) return;

    setCompleted(true);
    dispatch(runtimeActions.setHasInteracted());
  }, [completed, dispatch]);

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
