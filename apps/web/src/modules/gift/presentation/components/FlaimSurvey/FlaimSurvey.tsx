'use client';

import { Card, Button, LoaderDots } from '@maw/ui-lib';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ComponentProps, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { UseSurveryParams, useSurvey } from './hooks/useSurvey';
import { ProgressBar } from './ProgressBar';
import { Question } from './Question';
import { SurveyResult } from './SurveyResult';

import { useRuntimeStore } from '@/kernel';

export type FlaimSurveryProps = ComponentProps<typeof Card> & {
  settings: UseSurveryParams;
};

export function FlaimSurvey({
  className,
  settings,
  ...rest
}: FlaimSurveryProps) {
  const t = useTranslations();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const isCompleted = useRuntimeStore((state) => state.flaimSurveyResult);
  const { next, progression, questionData, selectOption, index } = useSurvey({
    ...settings,
  });

  useEffectOnce(() => setLoaded(true));

  const onHome = () => router.push('/');

  const showProgressHeader = loaded && isCompleted === false;
  const showQuestion = loaded && isCompleted === false && questionData;
  const showResult = loaded && isCompleted !== false;

  return (
    <Card className={`flex gap-3 p-5 ${className}`} {...rest}>
      {!loaded && (
        <div className="flex h-60 items-center justify-center">
          <LoaderDots />
        </div>
      )}
      {showProgressHeader && (
        <>
          <p className="mb-2 font-bold">
            {t('gifts.wanPhone.survey.description')}
          </p>
          <ProgressBar
            duration={settings.timeLimitInSeconds}
            warningDuration={settings.timeLimitInSeconds * 0.85}
          />
        </>
      )}
      {showQuestion && (
        <>
          <Question
            key={index}
            data={questionData}
            selectOption={selectOption}
          />
          <Button
            onClick={next}
            className="mt-5"
            disabled={typeof progression === 'undefined'}>
            {t('common.next')}
          </Button>
        </>
      )}
      {showResult && <SurveyResult result={isCompleted} onClick={onHome} />}
    </Card>
  );
}
