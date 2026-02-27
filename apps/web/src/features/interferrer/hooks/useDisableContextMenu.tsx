import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';

import { useEventBus } from '@/contexts/EventBusContext';
import { usePainPreferencesStore } from '@/stores';

export function useDisableContextMenu() {
  const t = useTranslations();
  const { dispatch } = useEventBus();
  const isDisabled = usePainPreferencesStore(
    (state) => state.flags.disableContextMenu,
  );
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      dispatch('CONTEXT_MENU_ATTEMPT');
      alert(t('contextMenu.disabled'));
    },
    [dispatch, t],
  );

  useEffect(() => {
    if (!isDisabled) return;

    document.addEventListener('contextmenu', handleContextMenu);

    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [handleContextMenu, isDisabled]);
}
