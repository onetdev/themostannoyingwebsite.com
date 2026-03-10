import type { IconAliaseKey } from '@maw/ui-lib';

export const ActiveNavigationItems = [
  'about',
  'achievements',
  'admin',
  'article-item',
  'contact',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
  'login',
  'only-spams',
  'plans',
  'privacy-policy',
  'search',
  'settings',
  'terms-of-use',
  'virgin',
] as const;
export type ActiveNavigationItem = (typeof ActiveNavigationItems)[number];

export type NavItem = {
  hideLabel?: boolean;
  icon?: IconAliaseKey;
  key: string;
  labelKey: AppTranslationKey;
  path: string;
};

export const SITE_NAVIGATION_LINKS: NavItem[] = [
  { key: 'home', labelKey: 'navigation.home', path: '/' },
  { key: 'dilf', labelKey: 'navigation.dilf', path: '/dilf' },
  { key: 'only-spams', labelKey: 'navigation.onlySpams', path: '/only-spams' },
  { key: 'plans', labelKey: 'navigation.plans', path: '/plans' },
  { key: 'donate', labelKey: 'navigation.donate', path: '/donate' },
  { key: 'about', labelKey: 'navigation.about', path: '/about' },
  { key: 'contact', labelKey: 'navigation.contact', path: '/contact' },
];

export const PERSONAL_NAVIGATION_LINKS: NavItem[] = [
  {
    hideLabel: true,
    icon: 'trophy' as const,
    key: 'achievements',
    labelKey: 'navigation.achievements',
    path: '/achievements',
  },
  {
    hideLabel: true,
    icon: 'share' as const,
    key: 'global-share',
    labelKey: 'common.action.share',
    path: '#share',
  },
  {
    hideLabel: true,
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

export const FOOTER_NAVIGATION_LINKS: NavItem[] = [
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
  {
    key: 'terms-of-use',
    labelKey: 'navigation.termsOfUse',
    path: '/terms-of-use',
  },
];

export const isNavigationItemActive = (
  item: NavItem,
  activeKey?: ActiveNavigationItem,
) => {
  if (activeKey === item.key) return true;
  return false;
};
