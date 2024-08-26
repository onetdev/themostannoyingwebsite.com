'use client';

import { FunctionComponent } from 'react';
import { useTranslation } from 'next-i18next';

import DimmerOverlay from '@/components/atoms/DimmerOverlay';
import Button from '@/components/atoms/Button';

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};
const ManualModal: FunctionComponent<ManualModalProps> = ({
  visible = false,
  onDismiss,
}) => {
  const { t } = useTranslation('common');

  return (
    <DimmerOverlay visible={visible}>
      <div className="fixed left-20 top-1 max-w-manual-modal rounded-md bg-surface px-8 py-4 text-on-secondary">
        <h3 className="mb-4 text-2xl">
          {t('experiences.notification_permission_manual.title')}
        </h3>
        <p>{t('experiences.notification_permission_manual.description')}</p>
        <Button onClick={onDismiss}>{t('actions.dismiss')}</Button>
      </div>
    </DimmerOverlay>
  );
};

export default ManualModal;
