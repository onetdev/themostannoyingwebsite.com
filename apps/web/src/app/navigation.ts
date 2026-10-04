import type { IconAliaseKey } from '@maw/ui-lib';
import type { RouteAlias } from '@/schemas';

export type NavItem = {
  hideLabel?: boolean;
  icon?: IconAliaseKey;
  id: string;
  labelKey: AppTranslationKey;
  hrefFor: RouteAliasParams;
};

export const SITE_NAVIGATION_LINKS: NavItem[] = [
  { id: 'home', labelKey: 'common.navigation.home', hrefFor: 'home' },
  { id: 'dilf', labelKey: 'common.navigation.dilf', hrefFor: 'dilf' },
  {
    id: 'only-spams',
    labelKey: 'common.navigation.onlySpams',
    hrefFor: 'only-spams',
  },
  { id: 'plans', labelKey: 'common.navigation.plans', hrefFor: 'plans' },
  { id: 'donate', labelKey: 'common.navigation.donate', hrefFor: 'donate' },
  { id: 'about', labelKey: 'common.navigation.about', hrefFor: 'about' },
  { id: 'contact', labelKey: 'common.navigation.contact', hrefFor: 'contact' },
];

export const PERSONAL_NAVIGATION_LINKS: NavItem[] = [
  {
    hideLabel: true,
    icon: 'trophy' as const,
    id: 'achievements',
    labelKey: 'common.navigation.achievements',
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
    labelKey: 'common.navigation.settings',
    hrefFor: 'settings',
  },
  {
    icon: 'login' as const,
    id: 'user.login',
    labelKey: 'common.navigation.login',
    hrefFor: 'user.login',
  },
];

export const FOOTER_NAVIGATION_LINKS: NavItem[] = [
  // Main website links
  { id: 'home', labelKey: 'common.navigation.home', hrefFor: 'home' },
  { id: 'plans', labelKey: 'common.navigation.plans', hrefFor: 'plans' },
  { id: 'donate', labelKey: 'common.navigation.donate', hrefFor: 'donate' },
  { id: 'about', labelKey: 'common.navigation.about', hrefFor: 'about' },
  { id: 'search', labelKey: 'common.navigation.search', hrefFor: 'search' },
  { id: 'contact', labelKey: 'common.navigation.contact', hrefFor: 'contact' },

  // Marketing related pages
  {
    id: 'flaim-a-phone',
    labelKey: 'common.navigation.flaimAPhone',
    hrefFor: 'flaim-a-phone',
  },
  { id: 'dilf', labelKey: 'common.navigation.dilf', hrefFor: 'dilf' },
  {
    id: 'hot-things',
    labelKey: 'common.navigation.hotThings',
    hrefFor: 'hot-things',
  },
  {
    id: 'only-spams',
    labelKey: 'common.navigation.onlySpams',
    hrefFor: 'only-spams',
  },
  { id: 'virgin', labelKey: 'common.navigation.virgin', hrefFor: 'virgin' },

  // User Management
  {
    id: 'plan-cancellation',
    labelKey: 'common.navigation.planCancellation',
    hrefFor: 'plans.cancellation',
  },
  { id: 'admin', labelKey: 'common.navigation.admin', hrefFor: 'admin' },
  {
    id: 'signup',
    labelKey: 'common.navigation.signup',
    hrefFor: 'user.signup',
  },
  {
    id: 'password-reminder',
    labelKey: 'common.navigation.passwordReminder',
    hrefFor: 'user.password-reminder',
  },
  {
    id: 'achievements',
    labelKey: 'common.navigation.achievements',
    hrefFor: 'achievements',
  },
  {
    id: 'settings',
    labelKey: 'common.navigation.settings',
    hrefFor: 'settings',
  },

  // And some mandatory stuff
  {
    id: 'privacy-policy',
    labelKey: 'common.navigation.privacyPolicy',
    hrefFor: 'privacy-policy',
  },
  {
    id: 'terms-of-use',
    labelKey: 'common.navigation.termsOfUse',
    hrefFor: 'terms-of-use',
  },
];

export const isNavigationItemActive = (item: NavItem, route?: RouteAlias) => {
  if (route === item.id) return true;
  return false;
};
