'use client';

import { useEffect, useState } from 'react';
import { useScrollDistanceTrigger } from '@/hooks';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import { NewsletterModal } from './NewsletterModal';

export interface NewsletterModalTriggerProps {
  scrollDistanceTrigger?: number;
}

export function NewsletterModalTrigger({
  scrollDistanceTrigger = 450,
}: NewsletterModalTriggerProps) {
  const enabled = usePainPreferencesStore(
    (state) => state.flags.newsletterModal,
  );
  const document = useRuntimeStore((state) => state.document);
  const [modalVisible, setModalVisible] = useState(false);

  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => setModalVisible(true),
  });

  useEffect(() => {
    if (document.hasEverBeenVisible && !document.isVisible) {
      setModalVisible(true);
    }
  }, [document.hasEverBeenVisible, document.isVisible]);

  const onModalDismiss = () => {
    setModalVisible(false);
  };

  if (!enabled! || !modalVisible) {
    return null;
  }

  return (
    <>
      <NewsletterModal visible={modalVisible} onDismiss={onModalDismiss} />
    </>
  );
}
