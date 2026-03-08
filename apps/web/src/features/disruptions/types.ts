import type disruptionsEnLocale from './i18n/en';

export type DisruptionsI18nShape = typeof disruptionsEnLocale;

declare global {
  interface AppEvents {
    'context-menu:triggered': never;
    'dead-pixel:clicked': never;
    'screensaver:maze:stepped': {
      passedSpecialCell: boolean;
    };
    'screensaver:bouncy-logo:bounced': {
      isPerfectCorner: boolean;
    };
  }
}
