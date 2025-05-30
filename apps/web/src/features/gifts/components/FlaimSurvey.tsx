'use client';

import { BorderedBox, Button, CompactFormRow, RadioButton } from '@maw/ui-lib';
import { arrayShuffle } from '@maw/utils/array';
import { useRouter } from 'next/navigation';
import { useMessages, useTranslations } from 'next-intl';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { FlaimSurveyQuestion } from '@/features/gifts';
import { useRuntimeStore } from '@/state/runtime';

export type FlaimSurveryProps = { className?: string; timeInSeconds?: number };

const FlaimSurvery: FunctionComponent<FlaimSurveryProps> = ({
  className,
  timeInSeconds = 8,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const isCompleted = useRuntimeStore((state) => state.flaimSurveyResult);
  const complete = useRuntimeStore((state) => state.setFlaimSurveyResult);
  const [inWarning, setInWarning] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1); // Will be set in useEffect
  const [progression, setProgression] = useState({
    selected: -1,
    answers: [] as boolean[],
  });
  const messages = useMessages();

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
  const viewData = pool[questionIndex];

  useEffect(() => {
    if (isCompleted !== false) {
      return;
    }

    const warningTimer = setTimeout(
      () => setInWarning(true),
      timeInSeconds * 0.85 * 1000,
    );

    const expireTrigger = setTimeout(() => {
      complete('lost');
    }, timeInSeconds * 1000);

    setQuestionIndex(0);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(expireTrigger);
    };
  }, [complete, timeInSeconds, isCompleted]);

  const onNext = () => {
    const isCorrect =
      typeof viewData.solution === 'undefined' ||
      viewData.options[progression.selected] === viewData.solution;

    setProgression((prev) => ({
      ...prev,
      answers: [...prev.answers, isCorrect],
    }));

    if (questionIndex >= pool.length - 1) {
      const hasWrongAnswers = progression.answers.includes(false);
      complete(hasWrongAnswers ? 'lost' : 'cheatDetected');
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const onHome = () => router.push('/');

  return (
    <BorderedBox className={`flex gap-3 ${className}`}>
      {isCompleted === false && (
        <>
          <p className="mb-2 font-bold">
            {t('gifts.wanPhone.survey.description')}
          </p>
          <div
            data-warning={inWarning.toString()}
            className="group border-success data-[warning=true]:border-warning w-full overflow-hidden rounded-full border">
            <div
              className="animate-width-100-0 bg-success group-data-[warning=true]:bg-warning h-5"
              style={{ animationDuration: `${timeInSeconds}s` }}
            />
          </div>
        </>
      )}
      {isCompleted === false && viewData && (
        <>
          <h3 className="my-3">{viewData.text}</h3>
          {viewData.options.map((option, index) => (
            <CompactFormRow key={`${index}-${option}`} label={option}>
              <RadioButton
                value={index}
                name="flaim-survey"
                onChange={() =>
                  setProgression((prev) => ({ ...prev, selected: index }))
                }
              />
            </CompactFormRow>
          ))}
          <Button
            onClick={onNext}
            className="mt-5"
            disabled={typeof progression === 'undefined'}>
            {t('common.next')}
          </Button>
        </>
      )}
      {isCompleted === 'completed' && (
        <SurveyResult
          text={t('gifts.wanPhone.survey.completed.text')}
          callToAction={t('gifts.wanPhone.survey.completed.callToAction')}
          onClick={onHome}
        />
      )}
      {isCompleted === 'lost' && (
        <SurveyResult
          text={t('gifts.wanPhone.survey.lost.text')}
          callToAction={t('gifts.wanPhone.survey.lost.callToAction')}
          onClick={onHome}
        />
      )}
      {isCompleted === 'cheatDetected' && (
        <SurveyResult
          text={t('gifts.wanPhone.survey.cheatDetected.text')}
          callToAction={t('gifts.wanPhone.survey.cheatDetected.callToAction')}
          onClick={onHome}
        />
      )}
    </BorderedBox>
  );
};

type SurveyResultProps = {
  text: string;
  callToAction: string;
  onClick: () => void;
};
const SurveyResult: FunctionComponent<SurveyResultProps> = ({
  text,
  callToAction,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3>{text}</h3>
      <Button className="mt-5" onClick={onClick}>
        {callToAction}
      </Button>
    </div>
  );
};

export default FlaimSurvery;
