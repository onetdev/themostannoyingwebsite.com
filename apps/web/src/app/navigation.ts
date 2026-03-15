import type { IconAliaseKey } from '@maw/ui-lib';

export const ActiveNavigationItems = [
  'about',
  'achievements',
  'admin',
  'article-single',
  'contact',
  'dilf',
  'donate',
  'flaim-a-phone',
  'home',
  'hot-things',
  'login',
  'only-spams',
  'plan-cancellation',
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
  id: string;
  labelKey: AppTranslationKey;
  hrefFor: NavigationParams;
};

export const SITE_NAVIGATION_LINKS: NavItem[] = [
  { id: 'home', labelKey: 'navigation.home', hrefFor: 'home' },
  { id: 'dilf', labelKey: 'navigation.dilf', hrefFor: 'dilf' },
  { id: 'only-spams', labelKey: 'navigation.onlySpams', hrefFor: 'only-spams' },
  { id: 'plans', labelKey: 'navigation.plans', hrefFor: 'plans' },
  { id: 'donate', labelKey: 'navigation.donate', hrefFor: 'donate' },
  { id: 'about', labelKey: 'navigation.about', hrefFor: 'about' },
  { id: 'contact', labelKey: 'navigation.contact', hrefFor: 'contact' },
];

export const PERSONAL_NAVIGATION_LINKS: NavItem[] = [
  {
    hideLabel: true,
    icon: 'trophy' as const,
    id: 'achievements',
    labelKey: 'navigation.achievements',
    hrefFor: 'achievements',
  },
  {
    hideLabel: true,
    icon: 'share' as const,
    id: 'global-share',
    labelKey: 'common.action.share',
    hrefFor: { raw: '#share' },
  },
  {
    hideLabel: true,
    icon: 'settings' as const,
    id: 'settings',
    labelKey: 'navigation.settings',
    hrefFor: 'settings',
  },
  {
    icon: 'login' as const,
    id: 'login',
    labelKey: 'navigation.login',
    hrefFor: 'user.login',
  },
];

export const FOOTER_NAVIGATION_LINKS: NavItem[] = [
  // Main website links
  { id: 'home', labelKey: 'navigation.home', hrefFor: 'home' },
  { id: 'plans', labelKey: 'navigation.plans', hrefFor: 'plans' },
  { id: 'donate', labelKey: 'navigation.donate', hrefFor: 'donate' },
  { id: 'about', labelKey: 'navigation.about', hrefFor: 'about' },
  { id: 'search', labelKey: 'navigation.search', hrefFor: 'search' },
  { id: 'contact', labelKey: 'navigation.contact', hrefFor: 'contact' },

  // Marketing related pages
  {
    id: 'flaim-a-fone',
    labelKey: 'navigation.flaimAPhone',
    hrefFor: 'flaim-a-phone',
  },
  { id: 'dilf', labelKey: 'navigation.dilf', hrefFor: 'dilf' },
  { id: 'hot-things', labelKey: 'navigation.hotThings', hrefFor: 'hot-things' },
  { id: 'only-spams', labelKey: 'navigation.onlySpams', hrefFor: 'only-spams' },
  { id: 'virgin', labelKey: 'navigation.virgin', hrefFor: 'virgin' },

  // User Management
  {
    id: 'plan-cancellation',
    labelKey: 'navigation.planCancellation',
    hrefFor: 'plans.cancellation',
  },
  { id: 'admin', labelKey: 'navigation.admin', hrefFor: 'admin' },
  { id: 'signup', labelKey: 'navigation.signup', hrefFor: 'user.signup' },
  {
    id: 'password-reminder',
    labelKey: 'navigation.passwordReminder',
    hrefFor: 'user.password-reminder',
  },
  {
    id: 'achievements',
    labelKey: 'navigation.achievements',
    hrefFor: 'achievements',
  },
  { id: 'settings', labelKey: 'navigation.settings', hrefFor: 'settings' },

  // And some mandatory stuff
  {
    id: 'privacy-policy',
    labelKey: 'navigation.privacyPolicy',
    hrefFor: 'privacy-policy',
  },
  {
    id: 'terms-of-use',
    labelKey: 'navigation.termsOfUse',
    hrefFor: 'terms-of-use',
  },
];

export const isNavigationItemActive = (
  item: NavItem,
  activeKey?: ActiveNavigationItem,
) => {
  if (activeKey === item.id) return true;
  return false;
};
