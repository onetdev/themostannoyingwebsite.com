import type supportEnLocale from './i18n/en';

export type SupportI18nShape = typeof supportEnLocale;

declare global {
  interface AppEvents {
    'support:bot-message-received': undefined;
  }
}
