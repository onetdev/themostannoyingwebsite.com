import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { FlaimSurveyResult as TFlaimSurveyResult } from '@/features/promotions/schemas';

type SurveyResultProps = {
  result: TFlaimSurveyResult;
  onClick: () => void;
};

export function SurveyResult({ result, onClick }: SurveyResultProps) {
  const t = useTranslations();

  const resultOptions: Record<
    TFlaimSurveyResult,
    { title: string; ctaLabel?: string }
  > = {
    completed: {
      title: t('gifts.wanPhone.survey.result.completed.text'),
    },
    cheatDetected: {
      title: t('gifts.wanPhone.survey.result.cheatDetected.text'),
    },
    lost: {
      title: t('gifts.wanPhone.survey.result.lost.text'),
    },
    timeout: {
      title: t('gifts.wanPhone.survey.result.timeout.text'),
    },
  };

  const resultViewData = resultOptions[result];

  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <h3>{resultViewData.title}</h3>
      <Button className="mt-5" onClick={onClick}>
        {resultViewData.ctaLabel ?? t('common.backHome')}
      </Button>
    </div>
  );
}
