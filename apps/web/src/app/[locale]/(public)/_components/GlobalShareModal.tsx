'use client';

import { ShareModal as ShareModalUI } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';
import { useRuntimeStore } from '@/stores';

export function GlobalShareModal() {
  const { shareModalData, setShareModalData } = useRuntimeStore();
  const t = useTranslations();

  useEvent(
    'ui:modal:dismiss-signaled',
    () => setShareModalData({ visible: false }),
    shareModalData.visible,
  );

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
