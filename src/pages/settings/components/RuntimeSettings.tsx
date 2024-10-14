import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';
import ReactTimeAgo from 'react-timeago';

import SettingsBlock from './SettingsBlock';

import { useRuntimeStore } from '@/state/runtime';

const RuntimeSettings: FunctionComponent = () => {
  const runtime = useRuntimeStore();
  const { t } = useTranslation(['settings', 'common']);

  return (
    <SettingsBlock title={t('settings:section.runtime.title')}>
      <small>{t('settings:section.runtime.disclaimer')}</small>
      <p>
        {t('settings:section.runtime.startedAgo')}{' '}
        {runtime.startedAt ? <ReactTimeAgo date={runtime.startedAt} /> : 'n/a'}
      </p>
      <p>
        {t('settings:section.runtime.visibilitySeconds')}{' '}
        <span>{runtime.document.visibilitySeconds}</span>
      </p>
      <p>
        {t('settings:section.runtime.isDocumentVisible')}{' '}
        <span>
          {runtime.document.isVisible
            ? t('common:response.yes')
            : t('common:response.yes')}
        </span>
      </p>
      <p>
        {t('settings:section.runtime.interactionUnlocked')}{' '}
        <span>
          {runtime.interactionUnlocked
            ? t('common:response.yes')
            : t('common:response.yes')}
        </span>
      </p>
    </SettingsBlock>
  );
};

export default RuntimeSettings;
