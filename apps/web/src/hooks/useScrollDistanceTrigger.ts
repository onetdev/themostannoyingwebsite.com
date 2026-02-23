'use client';

import { useCallback, useEffect, useState } from 'react';

export type ConditionalTriggerProps = {
  threshold: number;
  resetable?: boolean;
  onTrigger?: () => void;
};

export const useScrollDistanceTrigger = ({
  threshold,
  onTrigger,
  resetable,
}: ConditionalTriggerProps) => {
  const [isCompleted, setCompleted] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY >= threshold) {
      setCompleted(true);
      onTrigger?.();
    } else if (resetable) {
      setCompleted(false);
    }
  }, [onTrigger, resetable, threshold]);

  useEffect(() => {
    if (isCompleted) {
      return;
    }

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [isCompleted, onScroll]);
};
