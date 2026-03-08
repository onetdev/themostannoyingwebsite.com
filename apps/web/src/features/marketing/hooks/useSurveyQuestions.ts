'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMessages } from 'next-intl';
import { useMemo } from 'react';
import type { FlaimSurveyQuestion } from '../schemas';

export function useSurveyQuestions() {
  const messages = useMessages() as AppTranslationShape;

  const pool = useMemo(() => {
    const items = Object.entries(
      messages.marketing.wanPhone.survey.questionVariants,
    ).map(([, value]) => {
      return {
        text: value.text,
        options: Object.values(value.options),
        solution: value.solution,
      } satisfies FlaimSurveyQuestion;
    });

    return arrayShuffle(
      items.map((item) => ({ ...item, options: arrayShuffle(item.options) })),
    );
  }, [messages]);

  return pool;
}
