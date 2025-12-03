'use client';

import { useEffect, useState } from 'react';

import { NewsletterModal } from './components/NewsletterModal';

import {
  useExperienceFlagsStore,
  useRuntimeStore,
  useScrollDistanceTrigger,
} from '@/kernel';

export type NewsletterModalExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
export function NewsletterModalExperienceHost({
  scrollDistanceTrigger = 450,
}: NewsletterModalExperienceHostProps) {
  const enabled = useExperienceFlagsStore((state) => state.newsletterModal);
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
