import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';
import ReactTimeAgo from 'react-timeago';

import BorderedBox from '@/components/templates/BorderedBox';
import { useRuntimeStore } from '@/lib/state/runtime';

const RuntimeSettings: FunctionComponent = () => {
  const runtime = useRuntimeStore();
  const { t } = useTranslation();

  return (
    <BorderedBox title={t('settings.runtime.title')}>
      <small>
        <i>{t('settings.runtime.disclaimer')}</i>
      </small>
      <br />
      <p>
        {t('settings.runtime.startedAgo')}{' '}
        {runtime.startedAt ? <ReactTimeAgo date={runtime.startedAt} /> : 'n/a'}
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
      <p>
        {runtime.adblockerSuspected
          ? t('settings.runtime.adblockerSuspected')
          : t('settings.runtime.adblockerNotDetected')}
      </p>
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
