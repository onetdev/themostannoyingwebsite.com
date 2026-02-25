'use client';

import { useEffect } from 'react';

import { usePainPreferencesStore } from '@/stores';

export default function DisableAllOnMount() {
  const allDisabled = usePainPreferencesStore((state) => state.allDisable);

  useEffect(() => {
    allDisabled();
  }, [allDisabled]);

  return null;
}
