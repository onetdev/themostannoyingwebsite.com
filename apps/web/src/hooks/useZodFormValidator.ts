'use client';

import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useTranslations } from 'next-intl';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';

import { ZodTranslator } from '@/types';

export function useZodFormValidator<
  TFieldValues extends FieldValues = FieldValues,
>(factory: (t: ZodTranslator) => z.ZodSchema<TFieldValues>) {
  const t = useTranslations();
  return zodResolver<TFieldValues, unknown, TFieldValues>(
    // We have some funky types here, maybe we can do another round of trying to figure out what's wrong but for now, this works externally. The main issue comes from various zod versions and multiple signature overloads of the zodResolver function.
    factory(t) as unknown as any,
  );
}
