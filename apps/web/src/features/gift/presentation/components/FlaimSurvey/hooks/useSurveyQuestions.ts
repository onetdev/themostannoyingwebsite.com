'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMessages, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { FlaimSurveyQuestion } from '../../../../domain';

export function useSurveyQuestions() {
  const messages = useMessages();
  const t = useTranslations();

  const pool = useMemo(() => {
    const items = Object.keys(
      messages.gifts.wanPhone.survey.questionVariants,
    ).map((key) => {
      const questionKey = `gifts.wanPhone.survey.questionVariants.${key}`;
      const solutionKey = `${questionKey}.solution`;
      return {
        text: t(`${questionKey}.text`),
        options: Object.keys(
          messages.gifts.wanPhone.survey.questionVariants[key].options,
        ).map((optionKey) => t(`${questionKey}.options.${optionKey}`)),
        solution: t.has(solutionKey) ? t(solutionKey) : undefined,
      } satisfies FlaimSurveyQuestion;
    });

    return arrayShuffle(
      items.map((item) => ({ ...item, options: arrayShuffle(item.options) })),
    );
  }, [messages, t]);

  return pool;
}
