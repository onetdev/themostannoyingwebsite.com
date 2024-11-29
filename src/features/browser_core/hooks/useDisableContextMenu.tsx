import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';

const useDisableContextMenu = () => {
  const { t } = useTranslation('common');
  const isDisabled = useExperienceFlagsStore(
    (state) => state.disableContextMenu,
  );
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      alert(t('contextMenu.disabled'));
    },
    [t],
  );

  useEffect(() => {
    if (!isDisabled) return;

    document.addEventListener('contextmenu', handleContextMenu);

    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [handleContextMenu, isDisabled]);
};

export default useDisableContextMenu;
