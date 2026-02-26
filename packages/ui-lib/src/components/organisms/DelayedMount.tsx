'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';

export type DelayedMountProps = PropsWithChildren<{
  delay: number;
}>;

export function DelayedMount({ children, delay }: DelayedMountProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted && children;
}
