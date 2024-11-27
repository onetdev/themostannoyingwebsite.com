import { useTranslation } from 'next-i18next';
import { FunctionComponent, useState } from 'react';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';

const AdblockerSuspectBar: FunctionComponent = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(true);
  const suspected = useRuntimeStore((state) => state.adblockerSuspected);
  const enabled = useExperienceFlagsStore(
    (state) => state.gifts.detectAdblocker,
  );

  const show = enabled && suspected && isOpen;

  return (
    show && (
      <div className="sticky -bottom-3 rounded-md border border-tertiary bg-error px-5 py-3 text-on-error shadow-md">
        <h4>{t('gifts.suspectBar.title')}</h4>
        <p>{t('gifts.suspectBar.description')}</p>
        <div className="my-2 flex items-center justify-end gap-3">
          <button onClick={() => setOpen(false)}>{t('common.ok')}</button>
        </div>
      </div>
    )
  );
};

export default AdblockerSuspectBar;
