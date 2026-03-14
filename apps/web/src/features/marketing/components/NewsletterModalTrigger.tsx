'use client';

import { useEffect, useState } from 'react';
import { useEvent, useScrollDistanceTrigger } from '@/hooks';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import { NewsletterModal } from './NewsletterModal';

export interface NewsletterModalTriggerProps {
  scrollDistanceTrigger?: number;
}

export function NewsletterModalTrigger({
  scrollDistanceTrigger = 450,
}: NewsletterModalTriggerProps) {
  const autoTrigger = usePainPreferencesStore(
    (state) => state.flags.newsletterModal,
  );
  const document = useRuntimeStore((state) => state.document);
  const [modalVisible, setModalVisible] = useState(false);

  useEvent('ui:newsletter-modal:show', () => setModalVisible(true));

  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => {
      if (!autoTrigger) return;
      setModalVisible(true);
    },
  });

  useEffect(() => {
    if (document.hasEverBeenVisible && !document.isVisible && autoTrigger) {
      setModalVisible(true);
    }
  }, [document.hasEverBeenVisible, document.isVisible, autoTrigger]);

  const onModalDismiss = () => {
    setModalVisible(false);
  };

  if (!modalVisible) {
    return null;
  }

  return <NewsletterModal visible={modalVisible} onDismiss={onModalDismiss} />;
}
