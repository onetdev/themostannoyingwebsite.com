'use client';

import { Container } from 'inversify';
import { createContext, PropsWithChildren, useContext } from 'react';

export interface DependencyContainerContextType {
  container: Container;
}

export const DependencyContainerContext =
  createContext<DependencyContainerContextType | null>(null);

export function DependencyContainer({
  children,
  value,
}: PropsWithChildren<{ value: DependencyContainerContextType }>) {
  return (
    <DependencyContainerContext.Provider value={value}>
      {children}
    </DependencyContainerContext.Provider>
  );
}

export const useDependencyContainer = (): DependencyContainerContextType => {
  const context = useContext(DependencyContainerContext);
  if (!context) {
    throw new Error('useDependency must be used within a DependencyProvider');
  }
  return context;
};
