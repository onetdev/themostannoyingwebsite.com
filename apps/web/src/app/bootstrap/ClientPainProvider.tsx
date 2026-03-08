'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren, useEffect } from 'react';
import { emit } from '@/core/events/event-bus';
import { PageTitleGlitch } from '@/features/disruptions/components';
import {
  useDisableContextMenu,
  useNavigationHistoryClutter,
  usePreventLeaving,
} from '@/features/disruptions/hooks';
import { NewsletterModalTrigger } from '@/features/marketing/components';
import { useAdblockerDetector } from '@/features/marketing/hooks';
import { useEventHistoryListener } from '@/features/monitoring/hooks';
import { NotificationPromptTrigger } from '@/features/user/components';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export function ClientPainContainer({ children }: PropsWithChildren) {
  const t = useTranslations();
  const clipboardMarker = usePainPreferencesStore(
    (state) => state.flags.clipboardMarker,
  );

  useNavigationHistoryClutter();
  useDisableContextMenu();
  useAdblockerDetector();
  usePreventLeaving();
  useEventHistoryListener();

  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);
  useEffect(() => {
    syncPermissions();
  }, [syncPermissions]);

  const handleCopy = () => emit('global-text:copied');
  const copyMarkerText = {
    readMoreAt: t('app.readMoreAt'),
  };

  return (
    <>
      <PageTitleGlitch />
      <NewsletterModalTrigger />
      <NotificationPromptTrigger />
      <CopyMarker
        enabled={clipboardMarker}
        text={copyMarkerText}
        onCopy={handleCopy}
      >
        {children}
      </CopyMarker>
    </>
  );
}
