import type Emittery from 'emittery';
import type { ContentEvent } from '@/features/content/types';
import type { InterferrerEvent } from '@/features/interferrer/types';
import type { ObstructorEvent } from '@/features/obstructor/types';
import type { PromotionEvent } from '@/features/promotion/types';
import type { SubscriptionEvent } from '@/features/subscription/types';
import type { UserEvents } from '@/features/user/types';
import type { AchievementsEvent } from './features/achievements/types';

declare global {
  type AppTheme = 'light' | 'dark';

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

  type AppEvents = {
    'navigation:changed': {
      path: string;
    };
    'global-text:copied': never;
    'exit-prompt:shown': never;
  } & UserEvents &
    ContentEvent &
    InterferrerEvent &
    ObstructorEvent &
    PromotionEvent &
    SubscriptionEvent &
    AchievementsEvent;

  interface Window {
    maw?: {
      _emit?: Emittery<AppEvents>['emit'];
      _on?: Emittery<AppEvents>['on'];
    };
  }
}
