import { useEffect, useState } from 'react';

import { actions as runtimeActions } from '@/redux/slices/runtime';
import { useAppDispatch } from '@/redux/hooks';

/**
 * This will mesaure how long the webpage has been in focus and report it to
 * the redux store. Please note that if you change application but the
 * browser is still visible it will count as "in focus".
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 */
const useInFocusMeter = () => {
  const [isInFocus, setIsInFocusInternal] = useState(true);
  const dispatch = useAppDispatch();

  const handleVisibilityChange = () => {
    setIsInFocusInternal(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    dispatch(runtimeActions.setIsInFocus(isInFocus));
  }, [dispatch, isInFocus]);

  useEffect(() => {
    if (!isInFocus) return;

    const interval = setInterval(
      () => dispatch(runtimeActions.incrementInFocusSeconds()),
      1000,
    );
    return () => clearInterval(interval);
  }, [isInFocus, dispatch]);
};

export default useInFocusMeter;
