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
        back: navigation.back,
        forward: navigation.forward,
        push: (param: NavigationParams) =>
          navigation.push(resolvePathForRouteAlias(param)),
        replace: (param: NavigationParams) =>
          navigation.replace(resolvePathForRouteAlias(param)),
        resolve: resolvePathForRouteAlias,
        unsafePush: navigation.push,
        unsafeReplace: navigation.replace,
      }}
    >
      {children}
    </NavigationProviderBase>
  );
}
