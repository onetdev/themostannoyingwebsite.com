'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useRuntimeStore, useUserGrantsStore } from '@/stores';

export function AdblockerSuspectBar() {
  const t = useTranslations();
  const [isOpen, setOpen] = useState(true);
  const suspected = useRuntimeStore((state) => state.adblockerSuspected);
  const ppReviewed = useUserGrantsStore((state) => state.reviewCompleted);

  const show = ppReviewed && suspected === true && isOpen;

  if (!show) {
    return;
  }

  return (
    <div className="border-tertiary bg-error text-on-error sticky -bottom-3 z-20 rounded-md border px-5 py-3 shadow-md">
      <h4>{t('gifts.suspectBar.title')}</h4>
      <p>{t('gifts.suspectBar.description')}</p>
      <div className="my-2 flex items-center justify-end gap-3">
        <button onClick={() => setOpen(false)}>{t('common.ok')}</button>
      </div>
    </div>
  );
}
