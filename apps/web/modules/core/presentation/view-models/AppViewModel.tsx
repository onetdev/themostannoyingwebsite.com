import React, { createContext, PropsWithChildren } from 'react';

export type LinkComponentType = JSXProxyProps<'a'>;

export interface AppViewModelContextType {
  LinkComponent: LinkComponentType | null;
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
