import { compile } from 'path-to-regexp';
import type { RouteAlias } from '@/schemas';

const routeAliasToPathMap: Record<RouteAlias, string> = {
  'article.single': '/articles/:slug',
  'flaim-a-phone': '/flaim-a-phone',
  'hot-things': '/hot-things',
  'only-spams': '/only-spams',
  'plans.cancellation': '/plans/cancellation',
  'plans.special-deal': '/plans/special-deal',
  'privacy-policy': '/privacy-policy',
  'terms-of-use': '/terms-of-use',
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

export const resolvePathForRouteAlias = (param: NavigationParams) => {
  if (typeof param === 'string') {
    return routeAliasToPathMap[param];
  }

  if (typeof param === 'object' && 'raw' in param) {
    return param.raw;
  }

  const routeTemplate = routeAliasToPathMap[param.alias];
  return compile(routeTemplate)(param.params);
};
