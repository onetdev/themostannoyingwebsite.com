'use client';

import { FunctionComponent } from 'react';

import { Button, DimmerOverlay } from '@maw/ui';
import { useTranslations } from 'next-intl';

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};

const ManualModal: FunctionComponent<ManualModalProps> = ({
  visible = false,
  onDismiss,
}) => {
  const t = useTranslations();

  return (
    <DimmerOverlay visible={visible}>
      <div className="fixed inset-x-4 top-4 rounded-md bg-surface px-8 py-4 text-on-surface md:left-10 md:right-auto md:max-w-screen-sm">
        <h3 className="mb-4 text-2xl">{t('notification.modal.title')}</h3>
        <p>{t('notification.modal.description')}</p>
        <Button onClick={onDismiss} className="mt-3">
          {t('common.dismiss')}
        </Button>
      </div>
    </DimmerOverlay>
  );
};

export default ManualModal;
