'use client';

import { BorderedBox } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FunctionComponent, useMemo } from 'react';
import ReactTimeAgo from 'react-timeago';

import { useRuntimeStore } from '@/state/runtime';

const RuntimeSettings: FunctionComponent = () => {
  const runtime = useRuntimeStore();
  const t = useTranslations();

  const startedAt = useMemo(
    () => (runtime.startedAt ? new Date(runtime.startedAt) : undefined),
    [runtime.startedAt],
  );

  return (
    <BorderedBox title={t('settings.runtime.title')}>
      <small>
        <i>{t('settings.runtime.disclaimer')}</i>
      </small>
      <br />
      <p>
        {t('settings.runtime.startedAgo')}{' '}
        {startedAt ? <ReactTimeAgo date={startedAt} /> : 'n/a'}
      </p>
      <p>
        {t('settings.runtime.visibilitySeconds')}{' '}
        <span>{runtime.document.visibilitySeconds}</span>
      </p>
      <p>
        {t('settings.runtime.isDocumentVisible')}{' '}
        <span>
          {runtime.document.isVisible ? t('common.yes') : t('common.no')}
        </span>
      </p>
      <p>
        {t('settings.runtime.interactionUnlocked')}{' '}
        <span>
          {runtime.interactionUnlocked ? t('common.yes') : t('common.no')}
        </span>
      </p>
      <p>
        {t('settings.runtime.navigationCount')}{' '}
        <span>{runtime.navigationCount}</span>
      </p>
      {runtime.adblockerSuspected !== null && (
        <p>
          {runtime.adblockerSuspected
            ? t('settings.runtime.adblockerSuspected')
            : t('settings.runtime.adblockerNotDetected')}
        </p>
      )}
      <p>
        {t('settings.runtime.flaimSurveyResult')}{' '}
        <span>
          {runtime.flaimSurveyResult ? t('common.done') : t('common.pending')}
        </span>
      </p>
    </BorderedBox>
  );
};

export default RuntimeSettings;
