'use client';

import { useEffect } from 'react';

import { useExperienceFlagsStore } from '@/state/experience_flags';

export default function DisableAllOnMount() {
  const allDisabled = useExperienceFlagsStore((state) => state.allDisabled);

  useEffect(() => {
    allDisabled();
  }, [allDisabled]);

  return null;
}
