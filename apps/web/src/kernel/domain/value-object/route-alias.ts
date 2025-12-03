import { z } from 'zod';

const RouteAliasList = [
  'about',
  'article.single',
  'contact',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
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
