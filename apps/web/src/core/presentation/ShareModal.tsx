'use client';

import { ShareModal as ShareModalUI } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { useRuntimeStore } from '@/stores';

export function ShareModal() {
  const { shareModalData, setShareModalData } = useRuntimeStore();
  const t = useTranslations();

  const texts = {
    title: t('share.modal.title'),
    description: t('share.modal.description'),
  };

  return (
    <ShareModalUI
      show={shareModalData.visible}
      onClose={() => setShareModalData({ visible: false })}
      url={shareModalData.url}
      texts={texts}
    />
  );
}
