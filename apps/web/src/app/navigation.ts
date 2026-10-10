import type { IconAliaseKey } from '@maw/ui-lib';
import type { RouteAlias } from '@/schemas';

export type NavItem = {
  hideLabel?: boolean;
  icon?: IconAliaseKey;
  id: string;
  labelKey: AppTranslationKey;
  hrefFor: RouteAliasParams;
};

/** A nav item that renders as a dropdown instead of a direct link. */
export type NavGroup = {
  icon?: IconAliaseKey;
  id: string;
  labelKey: AppTranslationKey;
  items: NavItem[];
};

export type NavEntry = NavItem | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup =>
  'items' in entry;

const EXPLORE_NAVIGATION_LINKS: NavItem[] = [
  { id: 'dilf', labelKey: 'common.navigation.dilf', hrefFor: 'dilf' },
  {
    id: 'only-spams',
    labelKey: 'common.navigation.onlySpams',
    hrefFor: 'only-spams',
  },
  {
    id: 'hot-things',
    labelKey: 'common.navigation.hotThings',
    hrefFor: 'hot-things',
  },
  { id: 'virgin', labelKey: 'common.navigation.virgin', hrefFor: 'virgin' },
  {
    id: 'flaim-a-phone',
    labelKey: 'common.navigation.flaimAPhone',
    hrefFor: 'flaim-a-phone',
  },
];

export const SITE_NAVIGATION_LINKS: NavEntry[] = [
  { id: 'home', labelKey: 'common.navigation.home', hrefFor: 'home' },
  {
    id: 'explore',
    labelKey: 'common.navigation.explore',
    items: EXPLORE_NAVIGATION_LINKS,
  },
  { id: 'plans', labelKey: 'common.navigation.plans', hrefFor: 'plans' },
  {
    id: 'project',
    labelKey: 'common.navigation.theProject',
    items: [
      { id: 'donate', labelKey: 'common.navigation.donate', hrefFor: 'donate' },
      { id: 'about', labelKey: 'common.navigation.about', hrefFor: 'about' },
      {
        id: 'contact',
        labelKey: 'common.navigation.contact',
        hrefFor: 'contact',
      },
    ],
  },
];

/** Flattened site links (groups expanded) for flat renderers like the sheet. */
export const SITE_NAVIGATION_FLAT_LINKS: NavItem[] =
  SITE_NAVIGATION_LINKS.flatMap((entry) =>
    isNavGroup(entry) ? entry.items : [entry],
  );

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
