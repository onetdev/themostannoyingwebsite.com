import type userEnLocale from './i18n/en';

export type UserI18nShape = typeof userEnLocale;

declare global {
  interface AppEvents {
    'admin-auth:login': {
      username: string;
    };
  }
}
