import type Emittery from 'emittery';
import type { MessageKeys, NestedKeyOf } from 'next-intl';
import type englishShape from '@/i18n/messages/en.ts';
import type i18nConfig from '@/root/i18n.config';

declare global {
  type AppTheme = 'light' | 'dark';
  type AppLocale = (typeof i18nConfig)['locales'][number];
  type AppSupportedLocale = (typeof i18nConfig)['allLocales'][number];
  type AppTranslationShape = typeof englishShape;
  type AppTranslationKey = MessageKeys<
    AppTranslationShape,
    NestedKeyOf<AppTranslationShape>
  >;

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

  // biome-ignore lint/suspicious/noExplicitAny: Inferring useTranslations() return type is not enough :(
  type ZodTranslator = (key: AppTranslationKey, values?: any) => string;

  // biome-ignore lint/suspicious/noExplicitAny: Just to avoid any in other places, we use this explicit alias.
  type TypeNarrowArg = any;

  type CaptchaFormInputs = {
    captcha: string;
  };

  export type PagedList<T> = {
    items: T[];
    total: number;
    take: number;
    skip: number;
  };

  type NextPageParams = {
    locale: AppLocale;
  };

  type NextPageProps<T extends {} = object> = {
    params: Promise<T & NextPageParams>;
  };

  interface AppEvents {
    'navigation:changed': {
      path: string;
    };
    'global-text:copied': never;
    'exit-prompt:shown': never;
    'ui:modal:dismiss-signaled': never;
  }

  interface Window {
    maw?: {
      _emit?: Emittery<AppEvents>['emit'];
      _on?: Emittery<AppEvents>['on'];
    };
  }
}

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof englishShape;
  }
}
