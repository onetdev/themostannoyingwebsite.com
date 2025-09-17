import { useCallback, useEffect } from 'react';

import { useRuntimeStore } from '@/kernel';

/**
 * This will mesaure how long the webpage has been in focus and report it to
 * the its store. Please note that if you change application but the
 * browser is still visible it will count as "in focus".
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 */
const useDocumentVisibilityListener = () => {
  const isInFocus = useRuntimeStore((state) => state.document.isVisible);
  const setIsDocumentVisibile = useRuntimeStore(
    (state) => state.setIsDocumentVisibile,
  );
  const incrementVisibilitySeconds = useRuntimeStore(
    (state) => state.incrementVisibilitySeconds,
  );

  const handleVisibilityChange = useCallback(() => {
    setIsDocumentVisibile(!document.hidden);
  }, [setIsDocumentVisibile]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (!isInFocus) return;

    const interval = setInterval(() => incrementVisibilitySeconds(), 1000);
    return () => clearInterval(interval);
  }, [isInFocus, incrementVisibilitySeconds]);
};

export default useDocumentVisibilityListener;
