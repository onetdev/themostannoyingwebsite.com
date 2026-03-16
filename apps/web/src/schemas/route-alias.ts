import * as z from 'zod';

const RouteAliasList = [
  'about',
  'achievements',
  'admin',
  'article.single',
  'contact',
  'debug',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
  'only-spams',
  'plans.cancellation',
  'plans.special-deal',
  'plans',
  'privacy-policy',
  'search',
  'settings',
  'terms-of-use',
  'user.login',
  'user.password-reminder',
  'user.profile',
  'user.signup',
  'virgin',
] as const;

export const RouteAliasSchema = z.enum(RouteAliasList);

export type RouteAlias = (typeof RouteAliasList)[number];
