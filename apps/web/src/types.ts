import type { useTranslations } from 'next-intl';

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
  ...DIComments,
  ...DIContent,
  ...DIDonation,
  ...DISubscription,
};
