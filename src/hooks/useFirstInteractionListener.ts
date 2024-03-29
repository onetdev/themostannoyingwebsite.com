import { useCallback, useEffect } from 'react';

import { actions as runtimeActions } from '@/redux/slices/runtime';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectInteractionUnlocked } from '@/redux/selectors/runtime';

/**
 * Some browsers will limit features until the first user interaction has
 * occured. This is really important because some of the browser features
 * won't work until the user has interacted with the page (eg audio).
 */
const useFirstInteractionListener = () => {
  const completed = useAppSelector(selectInteractionUnlocked);
  const dispatch = useAppDispatch();

  const handleInteraction = useCallback(() => {
    if (completed) return;

    dispatch(runtimeActions.markInteractionUnlocked());
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

export default useFirstInteractionListener;
