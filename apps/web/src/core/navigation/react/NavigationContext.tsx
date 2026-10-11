'use client';

import { createContext, type PropsWithChildren, useContext } from 'react';

export interface NavigationProviderContextType {
  push: (param: RouteAliasParams) => void;
  replace: (param: RouteAliasParams) => void;
  resolve: (param: RouteAliasParams) => string;
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
