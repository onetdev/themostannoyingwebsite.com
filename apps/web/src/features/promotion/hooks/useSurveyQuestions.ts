'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMessages, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { FlaimSurveyQuestion } from '../schemas';

export function useSurveyQuestions() {
  const messages = useMessages();
  const t = useTranslations();

  const pool = useMemo(() => {
    const questionVariants =
      messages.promotions.wanPhone.survey.questionVariants;
    const items = Object.keys(questionVariants).map((key) => {
      const variantKey = key as keyof typeof questionVariants;
      const questionKey =
        `gifts.wanPhone.survey.questionVariants.${key}` as AppTranslationKey;
      const solutionKey = `${questionKey}.solution` as AppTranslationKey;

      return {
        text: t(`${questionKey}.text` as AppTranslationKey),
        options: Object.keys(questionVariants[variantKey].options).map(
          (optionKey) =>
            t(`${questionKey}.options.${optionKey}` as AppTranslationKey),
        ),
        solution: t.has(solutionKey) ? t(solutionKey) : undefined,
      } satisfies FlaimSurveyQuestion;
    });

    return arrayShuffle(
      items.map((item) => ({ ...item, options: arrayShuffle(item.options) })),
    );
  }, [messages, t]);

  return pool;
}
