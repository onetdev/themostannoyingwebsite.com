'use client';

import { compile } from 'path-to-regexp';
import { PropsWithChildren } from 'react';

import { AppLink } from '@/app/_components/AppLink';
import { useRouter } from '@/i18n/navigation';
import {
  NavigationParams,
  NavigationProvider as NavigationProviderBase,
} from '@/providers/NavigationProvider';
import { RouteAlias } from '@/schemas';

const routeAliasToPathMap: Record<RouteAlias, string> = {
  about: '/about',
  'article.single': '/articles/:slug',
  contact: '/contact',
  dilf: '/dilf',
  donate: '/donate',
  'flaim-a-phone': '/flaim-a-phone',
  home: '/',
  'hot-things': '/hot-things',
  'privacy-policy': '/privacy-policy',
  search: '/search',
  settings: '/settings',
  'user.login': '/user/login',
  'user.password-reminder': '/user/password-reminder',
  'user.profile': '/user/profile',
  'user.signup': '/user/signup',
  virgin: '/virgin',
};

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
      }}>
      {children}
    </NavigationProviderBase>
  );
}
