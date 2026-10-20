'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from '@/core/i18n/navigation';
import { NavigationProvider as NavigationProviderBase } from '@/core/react';
import { resolvePathForRouteAlias } from './navigation';

export function ClientNavigationConfigurator({ children }: PropsWithChildren) {
  const navigation = useRouter();

  return (
    <NavigationProviderBase
      value={{
        push: (param: RouteAliasParams) =>
          navigation.push(resolvePathForRouteAlias(param)),
        replace: (param: RouteAliasParams) =>
          navigation.replace(resolvePathForRouteAlias(param)),
        resolve: resolvePathForRouteAlias,
      }}
    >
      {children}
    </NavigationProviderBase>
  );
}
