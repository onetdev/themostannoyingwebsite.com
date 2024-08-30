import { useCallback, useEffect, useState } from 'react';

export type ConditionalTriggerProps = {
  threshold: number;
  onTrigger?: () => void;
};
const useScrollDistanceTrigger = ({
  threshold,
  onTrigger,
}: ConditionalTriggerProps) => {
  const [isCompleted, setCompleted] = useState(false);

  const onScroll = useCallback(() => {
    if (window.scrollY >= threshold) {
      setCompleted(true);
      onTrigger?.();
    }
  }, [onTrigger, threshold]);

  useEffect(() => {
    if (isCompleted) {
      return;
    }

    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [isCompleted, onScroll]);
};

export default useScrollDistanceTrigger;
