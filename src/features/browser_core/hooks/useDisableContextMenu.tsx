import { useCallback, useEffect } from 'react';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useTranslations } from 'next-intl';

const useDisableContextMenu = () => {
  const t = useTranslations('common');
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
