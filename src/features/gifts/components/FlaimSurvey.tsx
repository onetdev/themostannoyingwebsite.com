import { useTranslation } from 'next-i18next';
import { FunctionComponent, useMemo } from 'react';

import { FlaimSurveyQuestion } from '@/features/gifts';
import { useRuntimeStore } from '@/state/runtime';
import { arrayShuffle } from '@/utils/array';

export type FlaimSurveryProps = { className?: string };

const FlaimSurvery: FunctionComponent<FlaimSurveryProps> = ({ className }) => {
  const { t } = useTranslation();
  const isCompleted = useRuntimeStore((state) => state.flaimSurveyCompleted);
  const complete = useRuntimeStore((state) => state.setFlaimSurveyCompleted);

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

  return <div className={`max-w-screen-md ${className}`}>BABA</div>;
};

export default FlaimSurvery;
