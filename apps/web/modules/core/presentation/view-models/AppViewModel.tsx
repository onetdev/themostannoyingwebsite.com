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

export interface AppViewModelContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
  navigateBack: () => void;
  navigateForward: () => void;
  navigatePush: (url: string) => void;
  navigateReplace: (url: string) => void;
  pathFor: (param: NavigationParams) => string;
}

export const AppViewModelContext = createContext<
  AppViewModelContextType | undefined
>(undefined);

export function AppCoreViewModel({
  children,
  value,
}: PropsWithChildren<{ value: AppViewModelContextType }>) {
  return (
    <AppViewModelContext.Provider value={value}>
      {children}
    </AppViewModelContext.Provider>
  );
}
