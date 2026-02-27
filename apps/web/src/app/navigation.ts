import type { IconAliaseKey } from '@maw/ui-lib';

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
  'plans',
  'privacy-policy',
  'settings',
  'virgin',
  'search',
  'achievements',
] as const;
export type ActiveNavigationItem = (typeof ActiveNavigationItems)[number];

export type NavItem = {
  key: string;
  labelKey: string;
  path: string;
  icon?: IconAliaseKey;
};

export const SITE_NAVIGATION_LINKS = [
  { key: 'home', labelKey: 'navigation.home', path: '/' },
  { key: 'hot-things', labelKey: 'navigation.hotThings', path: '/hot-things' },
  { key: 'dilf', labelKey: 'navigation.dilf', path: '/dilf' },
  { key: 'plans', labelKey: 'navigation.plans', path: '/plans' },
  { key: 'donate', labelKey: 'navigation.donate', path: '/donate' },
  { key: 'about', labelKey: 'navigation.about', path: '/about' },
  { key: 'contact', labelKey: 'navigation.contact', path: '/contact' },
];

export const PERSONAL_NAVIGATION_LINKS = [
  {
    icon: 'trophy' as const,
    key: 'achievements',
    labelKey: 'navigation.achievements',
    path: '/achievements',
  },
  {
    icon: 'share' as const,
    key: 'global-share',
    labelKey: 'common.share',
    path: '#share',
  },
  {
    icon: 'settings' as const,
    key: 'settings',
    labelKey: 'navigation.settings',
    path: '/settings',
  },
  {
    icon: 'login' as const,
    key: 'login',
    labelKey: 'navigation.login',
    path: '/user/login',
  },
];

export const FOOTER_NAVIGATION_LINKS = [
  ...SITE_NAVIGATION_LINKS,
  { key: 'signup', labelKey: 'navigation.signup', path: '/user/signup' },
  {
    key: 'password-reminder',
    labelKey: 'navigation.passwordReminder',
    path: '/user/password-reminder',
  },
  {
    key: 'achievements',
    labelKey: 'navigation.achievements',
    path: '/achievements',
  },
  { key: 'settings', labelKey: 'navigation.settings', path: '/settings' },
  {
    key: 'privacy-policy',
    labelKey: 'navigation.privacyPolicy',
    path: '/privacy-policy',
  },
];

export const isNavigationItemActive = (
  item: NavItem,
  activeKey?: ActiveNavigationItem,
) => {
  if (activeKey === item.key) return true;
  return false;
};
