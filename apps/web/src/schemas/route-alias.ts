import * as z from 'zod';

const RouteAliasList = [
  'about',
  'achievements',
  'admin',
  'article.single',
  'contact',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
  'plans.cancellation',
  'plans.special-deal',
  'plans',
  'privacy-policy',
  'search',
  'settings',
  'user.login',
  'user.password-reminder',
  'user.profile',
  'user.signup',
  'virgin',
] as const;

export const RouteAliasSchema = z.enum(RouteAliasList);

export type RouteAlias = (typeof RouteAliasList)[number];
