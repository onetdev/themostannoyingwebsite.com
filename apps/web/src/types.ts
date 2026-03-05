import type Emittery from 'emittery';
import type { useTranslations } from 'next-intl';
import type englishShape from '@/i18n/messages/en.ts';
import type i18nConfig from '@/root/i18n.config';

declare global {
  type AppTheme = 'light' | 'dark';
  type AppLocale = (typeof i18nConfig)['locales'][number];
  type AppTranslationShape = typeof englishShape;

  type ZodTranslator = ReturnType<typeof useTranslations>;

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
    locale: string;
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
