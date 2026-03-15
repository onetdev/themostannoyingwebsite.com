'use client';

import {
  type ComponentProps,
  createContext,
  type PropsWithChildren,
  type ReactElement,
  useContext,
} from 'react';
import type { Link } from '@/core/i18n/navigation';
import type { RouteAlias } from '@/schemas';

export type LinkComponentType = PropsWithChildren<ComponentProps<typeof Link>>;

export type NavigationParams =
  | Exclude<RouteAlias, 'article.single'>
  | { alias: 'article.single'; params: { slug: string } };

export interface NavigationProviderContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
  back: () => void;
  forward: () => void;
  push: (param: NavigationParams) => void;
  replace: (param: NavigationParams) => void;
  pathFor: (param: NavigationParams) => string;
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
