import {
  type PainPreferencesState,
  PUBLIC_PAIN_POINT_LIST,
} from '../../src/kernel/domain/stores/pain-preferences';

const flags: PainPreferencesState['flags'] = {
  'gifts.detectAdblocker': false,
  'gifts.flaps': false,
  'gifts.oneByOne': false,
  'pageTitle.inactiveArrayPaged': false,
  'pageTitle.inactiveMarquee': false,
  'pageTitle.randomGlitch': false,
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
  screensaverTimeoutSeconds: 30,
};
