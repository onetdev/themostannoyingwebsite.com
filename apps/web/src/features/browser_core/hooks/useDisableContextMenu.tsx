import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import { useExperienceFlagsStore } from '@/state/experience_flags';

const useDisableContextMenu = () => {
  const t = useTranslations();
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
