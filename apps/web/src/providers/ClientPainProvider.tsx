'use client';

import { CopyMarker } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren, useEffect } from 'react';

import { useEventBus } from '@/contexts/EventBusContext';
import { PageTitleGlitch } from '@/features/interferrer/components';
import {
  useDisableContextMenu,
  useNavigationHistoryClutter,
  usePreventLeaving,
} from '@/features/interferrer/hooks';
import { NewsletterModalTrigger } from '@/features/newsletter/components';
import { useAdblockerDetector } from '@/features/promotion/hooks';
import { NotificationPromptTrigger } from '@/features/user/components';
import { usePainPreferencesStore, useUserGrantsStore } from '@/stores';

export function ClientPainContainer({ children }: PropsWithChildren) {
  const t = useTranslations();
  const { dispatch } = useEventBus();
  const clipboardMarker = usePainPreferencesStore(
    (state) => state.flags.clipboardMarker,
  );

  useNavigationHistoryClutter();
  useDisableContextMenu();
  useAdblockerDetector();
  usePreventLeaving();

  const syncPermissions = useUserGrantsStore((state) => state.syncPermissions);
  useEffect(() => {
    syncPermissions();
  }, [syncPermissions]);

  const handleCopy = () => dispatch('TEXT_COPIED');
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
