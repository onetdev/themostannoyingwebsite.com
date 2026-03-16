'use client';

import { createContext, type PropsWithChildren, useContext } from 'react';

export interface NavigationProviderContextType {
  back: () => void;
  forward: () => void;
  push: (param: NavigationParams) => void;
  replace: (param: NavigationParams) => void;
  resolve: (param: NavigationParams) => string;
  unsafePush: (url: string) => void;
  unsafeReplace: (url: string) => void;
}

export const NavigationProviderContext = createContext<
  NavigationProviderContextType | undefined
>(undefined);

export function NavigationProvider({
  children,
  value,
}: PropsWithChildren<{ value: NavigationProviderContextType }>) {
  return (
    <NavigationProviderContext.Provider value={value}>
      {children}
    </NavigationProviderContext.Provider>
  );
}

export const useNavigationProvider = (): NavigationProviderContextType => {
  const context = useContext(NavigationProviderContext);
  if (!context) {
    throw new Error(
      'useNavigationProvider must be used within a NavigationProvider',
    );
  }
  return context;
};
