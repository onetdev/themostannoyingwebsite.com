import Emittery from 'emittery';
import type { ContentEvent } from '@/features/content/types';
import type { InterferrerEvent } from '@/features/interferrer/types';
import type { ObstructorEvent } from '@/features/obstructor/types';
import type { PromotionEvent } from '@/features/promotion/types';
import type { SubscriptionEvent } from '@/features/subscription/types';
import type { UserEvents } from '@/features/user/types';
import type { AchievementsEvent } from './features/achievements/types';

export type AppEvents = {
  NAVIGATION: {
    path: string;
  };
  TEXT_COPIED: never;
  EXIT_PROMPT_TRIGGERED: never;
} & UserEvents &
  ContentEvent &
  InterferrerEvent &
  ObstructorEvent &
  PromotionEvent &
  SubscriptionEvent &
  AchievementsEvent;

export const eventBus = new Emittery<AppEvents>();
export const emit = eventBus.emit.bind(eventBus);
