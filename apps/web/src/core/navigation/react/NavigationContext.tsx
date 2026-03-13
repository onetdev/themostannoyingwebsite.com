'use client';

import {
  createContext,
  type PropsWithChildren,
  type ReactElement,
  useContext,
} from 'react';

import type { RouteAlias } from '@/schemas';

export type LinkComponentType = PropsWithChildren<{
  href: string;
  prefetch?: boolean;
}>;

export type NavigationParams =
  | Exclude<RouteAlias, 'article.single'>
  | { alias: 'article.single'; params: { slug: string } };

export interface NavigationProviderContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
  navigateBack: () => void;
  navigateForward: () => void;
  navigatePush: (param: NavigationParams) => void;
  navigateReplace: (param: NavigationParams) => void;
  pathFor: (param: NavigationParams) => string;
  unsafeNavigatePush: (url: string) => void;
  unsafeNavigateReplace: (url: string) => void;
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
