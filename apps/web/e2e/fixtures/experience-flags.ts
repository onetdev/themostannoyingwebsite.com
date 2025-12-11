import type { ExperienceFlagsState } from '../../src/kernel/domain/stores/experience-flags';

export const allDisabledExperienceFlagsState: Partial<ExperienceFlagsState> = {
  gifts: {
    detectAdblocker: false,
    flaps: false,
    oneByOne: false,
  },
  clipboardMarker: false,
  contentPaywall: false,
  deadPixel: false,
  disableContextMenu: false,
  exitPrompt: false,
  historySpam: false,
  mockChat: false,
  newsletterModal: false,
  notifications: false,
  pageTitle: {
    inactiveMarquee: false,
    randomGlitch: false,
    inactiveArrayPaged: false,
  },
  searchDelay: false,
  stickyVideo: false,
  wheelOfFortune: false,
};
