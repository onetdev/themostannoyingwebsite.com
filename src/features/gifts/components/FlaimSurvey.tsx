import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Button from '@/components/atoms/Button';
import RadioButton from '@/components/atoms/RadioButton';
import LabeledChild from '@/components/molecules/LabeledChild';
import BorderedBox from '@/components/templates/BorderedBox';
import { FlaimSurveyQuestion } from '@/features/gifts';
import { useRuntimeStore } from '@/lib/state/runtime';
import { arrayShuffle } from '@/lib/utils/array';

export type FlaimSurveryProps = { className?: string; timeInSeconds?: number };

const FlaimSurvery: FunctionComponent<FlaimSurveryProps> = ({
  className,
  timeInSeconds = 8,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isCompleted = useRuntimeStore((state) => state.flaimSurveyResult);
  const complete = useRuntimeStore((state) => state.setFlaimSurveyResult);
  const [inWarning, setInWarning] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1); // Will be set in useEffect
  const [progression, setProgression] = useState({
    selected: -1,
    answers: [] as boolean[],
  });

  const pool = useMemo(() => {
    const items = Array.from(
      t('gifts.wanPhone.survey.questionVariants', {
        returnObjects: true,
        defaultValue: [],
      }),
    ) as FlaimSurveyQuestion[];

    return arrayShuffle(
      items.map((item) => ({ ...item, options: arrayShuffle(item.options) })),
    );
  }, [t]);
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
            className="group w-full overflow-hidden rounded-full border border-success data-[warning=true]:border-warning">
            <div
              className="h-5 animate-width-100-0 bg-success group-data-[warning=true]:bg-warning"
              style={{ animationDuration: `${timeInSeconds}s` }}
            />
          </div>
        </>
      )}
      {isCompleted === false && viewData && (
        <>
          <h3 className="my-3">{viewData.text}</h3>
          {viewData.options.map((option, index) => (
            <LabeledChild key={`${index}-${option}`} label={option}>
              <RadioButton
                value={index}
                name="flaim-survey"
                onChange={() =>
                  setProgression((prev) => ({ ...prev, selected: index }))
                }
              />
            </LabeledChild>
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
