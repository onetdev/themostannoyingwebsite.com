'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMemo } from 'react';
import { usePool } from '@/features/content/hooks';
import type { FlaimSurveyQuestion } from '../schemas';

export function useSurveyQuestions() {
  const questionVariants = usePool('survey');

  const pool = useMemo(() => {
    const items = questionVariants.map(
      (value) =>
        ({
          id: value.id,
          text: value.text,
          options: arrayShuffle(value.options),
          solution: value.solution,
        }) satisfies FlaimSurveyQuestion,
    );

    return arrayShuffle(items);
  }, [questionVariants]);

  return pool;
}
