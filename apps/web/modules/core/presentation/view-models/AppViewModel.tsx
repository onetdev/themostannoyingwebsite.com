'use client';

import { createContext, PropsWithChildren, ReactElement } from 'react';

export type LinkComponentType = PropsWithChildren<{
  href: string;
  prefetch?: boolean;
}>;

export interface AppViewModelContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
  navigatePush: (url: string) => void;
  navigateReplace: (url: string) => void;
  navigateBack: () => void;
  navigateForward: () => void;
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
