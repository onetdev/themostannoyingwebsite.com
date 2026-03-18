'use client';

import { useEffect, useState } from 'react';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import { RatingDialog } from './RatingDialog';

export interface RatingDialogTriggerProps {
  pageViewsThreshold?: number;
}

export function RatingDialogTrigger({
  pageViewsThreshold = 1,
}: RatingDialogTriggerProps) {
  const isEnabled = usePainPreferencesStore(
    (state) => state.flags.ratingDialog,
  );
  const navigationCount = useRuntimeStore((state) => state.navigationCount);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      isEnabled &&
      navigationCount > 0 &&
      navigationCount % pageViewsThreshold === 0
    ) {
      setIsOpen(true);
    }
  }, [isEnabled, navigationCount, pageViewsThreshold]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  if (!isOpen) {
    return null;
  }

  return <RatingDialog isOpen={isOpen} onOpenChange={handleOpenChange} />;
}
