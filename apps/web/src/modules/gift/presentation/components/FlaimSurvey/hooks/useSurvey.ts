'use client';

import { useEffect, useState } from 'react';

import { useSurveyQuestions } from './useSurveyQuestions';

import { useRuntimeStore } from '@/kernel';

export type UseSurveryParams = {
  timeLimitInSeconds: number;
};

export function useSurvey({ timeLimitInSeconds }: UseSurveryParams) {
  const isCompleted = useRuntimeStore((state) => state.flaimSurveyResult);
  const storeComplete = useRuntimeStore((state) => state.setFlaimSurveyResult);

  const [questionIndex, setQuestionIndex] = useState(-1); // Will be set in useEffect
  const [progression, setProgression] = useState({
    selected: -1,
    answers: [] as boolean[],
  });

  const pool = useSurveyQuestions();
  const questionData = pool[questionIndex];

  useEffect(() => {
    if (isCompleted !== false) {
      return;
    }

    const expireTrigger = setTimeout(() => {
      storeComplete('timeout');
    }, timeLimitInSeconds * 1000);

    setQuestionIndex(0);

    return () => {
      clearTimeout(expireTrigger);
    };
  }, [storeComplete, timeLimitInSeconds, isCompleted]);

  const next = () => {
    const isCorrect =
      typeof questionData.solution === 'undefined' ||
      questionData.options[progression.selected] === questionData.solution;

    const updatedAnswers = [...progression.answers, isCorrect];

    setProgression((prev) => ({
      ...prev,
      answers: updatedAnswers,
    }));

    if (questionIndex >= pool.length - 1) {
      const hasWrongAnswers = updatedAnswers.includes(false);
      storeComplete(hasWrongAnswers ? 'lost' : 'cheatDetected');
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const selectOption = (index: number) => {
    setProgression((prev) => ({ ...prev, selected: index }));
  };

  return {
    next,
    selectOption,
    progression,
    questionData,
  };
}
