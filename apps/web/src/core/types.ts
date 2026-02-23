import { type useTranslations } from 'next-intl';

export type ZodTranslator = ReturnType<typeof useTranslations>;

export const DI = {
  CountryRepository: Symbol.for('CountryRepository'),
  KernelService: Symbol.for('KernelService'),
};
