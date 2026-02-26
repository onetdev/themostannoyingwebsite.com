'use client';

import {
  createContext,
  type FunctionComponent,
  type PropsWithChildren,
  useContext,
} from 'react';

import type { AppConfig } from '@/schemas/app-config';

export const AppConfigContext = createContext<AppConfig | null>(null);

type AppConfigProviderProps = PropsWithChildren<{
  config?: AppConfig;
}>;

export const AppConfigProvider: FunctionComponent<AppConfigProviderProps> = ({
  children,
  config: configProp,
}) => {
  const configValue = configProp ?? null;

  return (
    <AppConfigContext.Provider value={configValue}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }

  return context;
};
