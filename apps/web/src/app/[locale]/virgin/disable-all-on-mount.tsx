'use client'

import { useExperienceFlagsStore } from '@/root/apps/web/src/lib/state/experience_flags';
import { useEffect } from 'react';

export default function DisableAllOnMount() {
  const allDisabled = useExperienceFlagsStore((state) => state.allDisabled);

  useEffect(() => {
    allDisabled();
  }, [allDisabled]);

  return null
};
