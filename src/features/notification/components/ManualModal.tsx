'use client';

import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import Button from '@/components/atoms/Button';
import DimmerOverlay from '@/components/atoms/DimmerOverlay';

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};

const ManualModal: FunctionComponent<ManualModalProps> = ({
  visible = false,
  onDismiss,
}) => {
  const { t } = useTranslation(['notifications', 'common']);

  t('common:actions.dismiss');

  return (
    <DimmerOverlay visible={visible}>
      <div className="fixed left-20 top-1 max-w-manual-modal rounded-md bg-surface px-8 py-4 text-on-surface">
        <h3 className="mb-4 text-2xl">
          {t('notifications:enable_manual_modal.title')}
        </h3>
        <p>{t('notifications:enable_manual_modal.description')}</p>
        <Button onClick={onDismiss} className="mt-3">
          {t('common:actions.dismiss')}
        </Button>
      </div>
    </DimmerOverlay>
  );
};

export default ManualModal;
