'use client';

import type { Container, ServiceIdentifier } from 'inversify';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export interface DiContextType {
  container: Container;
}

export const DiContext = createContext<DiContextType | null>(null);

export function DiContextProvider({
  children,
  value,
}: PropsWithChildren<{ value: DiContextType }>) {
  return <DiContext.Provider value={value}>{children}</DiContext.Provider>;
}

export const useDiContext = (): DiContextType => {
  const context = useContext(DiContext);
  if (!context) {
    throw new Error('useDiContext must be used within a DiContextProvider');
  }
  return context;
};

export function useInjection<T>(identifier: ServiceIdentifier<T>): T {
  const { container } = useDiContext();
  return useMemo(() => container.get<T>(identifier), [container, identifier]);
}
