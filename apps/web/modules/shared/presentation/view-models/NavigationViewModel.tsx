'use client';

import { createContext, PropsWithChildren, ReactElement } from 'react';

import { RouteAliasType } from '../../domain';

export type LinkComponentType = PropsWithChildren<{
  href: string;
  prefetch?: boolean;
}>;

export type NavigationParams =
  | Exclude<RouteAliasType, 'article.single'>
  | { alias: 'article.single'; params: { slug: string } };

export interface NavigationViewModelContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
  navigateBack: () => void;
  navigateForward: () => void;
  navigatePush: (param: NavigationParams) => void;
  navigateReplace: (param: NavigationParams) => void;
  pathFor: (param: NavigationParams) => string;
  unsafeNavigatePush: (url: string) => void;
  unsafeNavigateReplace: (url: string) => void;
}

export const NavigationViewModelContext = createContext<
  NavigationViewModelContextType | undefined
>(undefined);

export function NavigationViewModel({
  children,
  value,
}: PropsWithChildren<{ value: NavigationViewModelContextType }>) {
  return (
    <NavigationViewModelContext.Provider value={value}>
      {children}
    </NavigationViewModelContext.Provider>
  );
}
