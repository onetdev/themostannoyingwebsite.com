'use client';

import { createContext, PropsWithChildren, ReactElement } from 'react';

export type LinkComponentType = PropsWithChildren<{
  href: string;
  prefetch?: boolean;
}>;

export interface AppViewModelContextType {
  LinkComponent: (props: LinkComponentType) => ReactElement;
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
