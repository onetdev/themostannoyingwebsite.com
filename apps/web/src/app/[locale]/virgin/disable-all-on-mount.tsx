'use client';

import { useEffect } from 'react';

import { useExperienceFlagsStore } from '@/kernel';

export default function DisableAllOnMount() {
  const allDisabled = useExperienceFlagsStore((state) => state.allDisabled);

  useEffect(() => {
    allDisabled();
  }, [allDisabled]);

  return null;
}
