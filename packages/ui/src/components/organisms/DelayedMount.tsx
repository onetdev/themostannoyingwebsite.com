'use client';

import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

export type DelayedMountProps = PropsWithChildren<{
  delay: number;
}>;

export const DelayedMount: FunctionComponent<DelayedMountProps> = ({
  children,
  delay,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted && children;
};
