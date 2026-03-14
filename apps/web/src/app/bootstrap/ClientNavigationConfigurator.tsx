'use client';

import { compile } from 'path-to-regexp';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Link, useRouter } from '@/core/i18n/navigation';
import {
  type NavigationParams,
  NavigationProvider as NavigationProviderBase,
} from '@/core/react';
import type { RouteAlias } from '@/schemas';

const routeAliasToPathMap: Record<RouteAlias, string> = {
  'article.single': '/articles/:slug',
  'flaim-a-phone': '/flaim-a-phone',
  'hot-things': '/hot-things',
  'plans.cancellation': '/plans/cancellation',
  'privacy-policy': '/privacy-policy',
  'user.login': '/user/login',
  'user.password-reminder': '/user/password-reminder',
  'user.profile': '/user/profile',
  'user.signup': '/user/signup',
  about: '/about',
  achievements: '/achievements',
  admin: '/admin',
  contact: '/contact',
  dilf: '/dilf',
  donate: '/donate',
  home: '/',
  plans: '/plans',
  search: '/search',
  settings: '/settings',
  virgin: '/virgin',
};

export type AppLinkProps = PropsWithChildren<ComponentProps<typeof Link>>;

export function AppLink({ children, ...rest }: AppLinkProps) {
  return <Link {...rest}>{children}</Link>;
}

export function ClientNavigationConfigurator({ children }: PropsWithChildren) {
  const navigation = useRouter();

  const resolvePathForRouteAlias = (param: NavigationParams) => {
    if (typeof param === 'string') {
      return routeAliasToPathMap[param];
    }

    const routeTemplate = routeAliasToPathMap[param.alias];
    return compile(routeTemplate)(param.params);
  };

  return (
    <NavigationProviderBase
      value={{
        LinkComponent: AppLink,
        navigateBack: navigation.back,
        navigateForward: navigation.forward,
        navigatePush: (param: NavigationParams) =>
          navigation.push(resolvePathForRouteAlias(param)),
        navigateReplace: (param: NavigationParams) =>
          navigation.replace(resolvePathForRouteAlias(param)),
        pathFor: resolvePathForRouteAlias,
        unsafeNavigatePush: navigation.push,
        unsafeNavigateReplace: navigation.replace,
      }}
    >
      {children}
    </NavigationProviderBase>
  );
}
