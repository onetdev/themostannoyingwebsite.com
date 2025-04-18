export const ActiveNavigationItems = [
  'about',
  'article-item',
  'contact',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
  'login',
  'privacy-policy',
  'settings',
  'virgin',
  'search',
] as const;
export type ActiveNavigationItem = (typeof ActiveNavigationItems)[number];
