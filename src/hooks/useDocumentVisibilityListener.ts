import { useCallback, useEffect } from 'react';

import { actions as runtimeActions } from '@/redux/slices/runtime';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectIsInFocus } from '@/redux/selectors/runtime';

/**
 * This will mesaure how long the webpage has been in focus and report it to
 * the redux store. Please note that if you change application but the
 * browser is still visible it will count as "in focus".
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 */
const useDocumentVisibilityListener = () => {
  const isInFocus = useAppSelector(selectIsInFocus);
  const dispatch = useAppDispatch();

  const handleVisibilityChange = useCallback(() => {
    dispatch(runtimeActions.setIsInFocus(!document.hidden));
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!isInFocus) return;

    const interval = setInterval(
      () => dispatch(runtimeActions.incrementInFocusSeconds()),
      1000,
    );
    return () => clearInterval(interval);
  }, [isInFocus, dispatch]);
};

export default useDocumentVisibilityListener;
