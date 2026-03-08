import type marketingEnLocale from './i18n/en';

export type MarketingI18nShape = typeof marketingEnLocale;

declare global {
  interface AppEvents {
    'wof:spin-completed': {
      prize: string;
    };
  }
}
