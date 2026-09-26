'use client';

import { arrayShuffle } from '@maw/utils/array';
import { useMemo } from 'react';
import { useVariantPool } from '@/features/content/hooks';
import type { FlaimSurveyQuestion } from '../schemas';

export function useSurveyQuestions() {
  const questionVariants = useVariantPool('quiz-questions');

  const pool = useMemo(() => {
    const items = questionVariants.map((value) => {
      const options = Array.isArray(value.options)
        ? value.options
        : Object.values(value.options);

      return {
        text: value.text,
        options: arrayShuffle(options),
        solution: value.solution,
      } satisfies FlaimSurveyQuestion;
    });

    return arrayShuffle(items);
  }, [questionVariants]);

  return pool;
}
