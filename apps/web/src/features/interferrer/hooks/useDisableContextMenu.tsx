import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { emit } from '@/eventBus';
import { usePainPreferencesStore } from '@/stores';

export function useDisableContextMenu() {
  const t = useTranslations();
  const isDisabled = usePainPreferencesStore(
    (state) => state.flags.disableContextMenu,
  );
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      emit('context-menu:triggered');
      alert(t('contextMenu.disabled'));
    },
    [t],
  );

  useEffect(() => {
    if (!isDisabled) return;

    document.addEventListener('contextmenu', handleContextMenu);

    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [handleContextMenu, isDisabled]);
}
