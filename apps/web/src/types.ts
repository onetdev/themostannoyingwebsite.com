import type { useTranslations } from 'next-intl';
import { DI as DIAchievements } from '@/features/achievements/types';
import { DI as DIAuth } from '@/features/auth/types';
import { DI as DIComments } from '@/features/comments/types';
import { DI as DIContent } from '@/features/content/types';
import { DI as DIDonation } from '@/features/donation/types';
import { DI as DISubscription } from '@/features/subscription/types';

export type ZodTranslator = ReturnType<typeof useTranslations>;

export const DI = {
  CountryRepository: Symbol.for('CountryRepository'),
  KernelService: Symbol.for('KernelService'),
  ...DIAuth,
  ...DIAchievements,
  ...DIComments,
  ...DIContent,
  ...DIDonation,
  ...DISubscription,
};

export type EventPayload<
  T1 extends { type: string; payload?: unknown },
  T2 extends string,
> = Extract<T1, { type: T2 }>['payload'];

export type AppEvent =
  | {
      type: 'NAVIGATION';
      payload: {
        path: string;
      };
    }
  | {
      type: 'TEXT_COPIED';
      payload?: never;
    }
  | {
      type: 'EXIT_PROMPT_TRIGGERED';
      payload?: never;
    };
