'use client';

import { ThemeProvider } from 'next-themes';
import { compile } from 'path-to-regexp';
import { FunctionComponent, PropsWithChildren } from 'react';

import { AppLink } from '@/components/AppLink';
import { useRouter } from '@/i18n/navigation';
import {
  NavigationParams,
  NavigationViewModel,
  RouteAliasType,
} from '@/modules/shared';
import ExperienceProvider from '@/providers/ExperienceProvider';
import { RootPortalProvider } from '@/providers/RootPortalProvider';

const routeAliasToPathMap: Record<RouteAliasType, string> = {
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

const RootProviderContainer: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const navigation = useRouter();

  const resolvePathForRouteAlias = (param: NavigationParams) => {
    if (typeof param === 'string') {
      return routeAliasToPathMap[param];
    }

    const routeTemplate = routeAliasToPathMap[param.alias];
    return compile(routeTemplate)(param.params);
  };

  return (
    <RootPortalProvider>
      <ThemeProvider defaultTheme="dark" enableColorScheme enableSystem>
        <NavigationViewModel
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
          <ExperienceProvider>{children}</ExperienceProvider>
        </NavigationViewModel>
      </ThemeProvider>
    </RootPortalProvider>
  );
};

export default RootProviderContainer;
