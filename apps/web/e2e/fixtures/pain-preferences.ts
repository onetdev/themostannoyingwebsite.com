import {
  type PainPreferencesState,
  PUBLIC_PAIN_POINT_LIST,
} from '@/stores/pain-preferences';

const flags: PainPreferencesState['flags'] = {
  'pageTitle.inactiveArrayPaged': false,
  'pageTitle.inactiveMarquee': false,
  'pageTitle.randomGlitch': false,
  'promotions.detectAdblocker': false,
  'promotions.flaps': false,
  'promotions.oneByOne': false,
  achievementNotifications: false,
  clipboardMarker: false,
  contentPaywall: false,
  deadPixel: false,
  disableContextMenu: false,
  exitPrompt: false,
  historySpam: false,
  mockChat: false,
  newsletterModal: false,
  notifications: false,
  screensaver: false,
  searchDelay: false,
  stickyVideo: false,
  wheelOfFortune: false,
};

export const allDisabledPainPreferencesState: PainPreferencesState = {
  flags,
  publicLevel: {
    current: 0,
    max: PUBLIC_PAIN_POINT_LIST.length,
  },
  screensaver: {
    timeoutSeconds: 30,
    variant: 'bouncingLogo',
  },
};
