'use client';

import { useEffect, useState } from 'react';

import { NewsletterModal } from './components/NewsletterModal';

import {
  usePainPreferencesStore,
  useRuntimeStore,
  useScrollDistanceTrigger,
} from '@/kernel';

export type NewsletterModalHostProps = {
  scrollDistanceTrigger?: number;
};
export function NewsletterModalHost({
  scrollDistanceTrigger = 450,
}: NewsletterModalHostProps) {
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
