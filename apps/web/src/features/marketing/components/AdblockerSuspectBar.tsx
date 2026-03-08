'use client';

import { Button } from '@maw/ui-lib';
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
    <div className="border-tertiary bg-error text-on-error sticky -bottom-3 z-20 rounded-t-md border px-5 py-3 shadow-md">
      <h4>{t('marketing.suspectBar.title')}</h4>
      <p>{t('marketing.suspectBar.description')}</p>
      <div className="my-2 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => setOpen(false)}>
          {t('common.action.ok')}
        </Button>
      </div>
    </div>
  );
}
