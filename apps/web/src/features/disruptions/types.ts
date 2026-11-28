import type disruptionsEnLocale from './i18n/en';

export type DisruptionsI18nShape = typeof disruptionsEnLocale;

declare global {
  interface AppEvents {
    'context-menu:triggered': never;
    'dead-pixel:clicked': {
      isRainbow: boolean;
    };
    'possessed-cursor:caught': {
      cursorId: string;
    };
    'screensaver:maze:stepped': {
      passedSpecialCell: boolean;
    };
    'screensaver:bouncy-logo:bounced': {
      isPerfectCorner: boolean;
    };
  }
}
