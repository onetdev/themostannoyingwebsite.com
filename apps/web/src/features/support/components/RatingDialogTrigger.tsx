'use client';

import { useEffect, useState } from 'react';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import { RatingDialog } from './RatingDialog';

export interface RatingDialogTriggerProps {
  pageViewsThreshold?: number;
}

export function RatingDialogTrigger({
  pageViewsThreshold = 5,
}: RatingDialogTriggerProps) {
  const isEnabled = usePainPreferencesStore(
    (state) => state.flags.ratingDialog,
  );
  const navigationCount = useRuntimeStore((state) => state.navigationCount);
  const [isOpen, setIsOpen] = useState(false);
  const [shownForCount, setShownForCount] = useState(0);

  useEffect(() => {
    if (
      isEnabled &&
      navigationCount > 0 &&
      navigationCount % pageViewsThreshold === 0 &&
      navigationCount !== shownForCount
    ) {
      setIsOpen(true);
      setShownForCount(navigationCount);
    }
  }, [isEnabled, navigationCount, pageViewsThreshold, shownForCount]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  if (!isOpen) {
    return null;
  }

  return <RatingDialog isOpen={isOpen} onOpenChange={handleOpenChange} />;
}
