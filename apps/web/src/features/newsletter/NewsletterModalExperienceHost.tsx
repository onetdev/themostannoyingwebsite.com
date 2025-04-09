'use client';

import { FunctionComponent, useEffect, useState } from 'react';

import NewsletterModal from './components/NewsletterModal';

import useScrollDistanceTrigger from '@/lib/hooks/useScrollDistanceTrigger';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';

export type NewsletterModalExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
const NewsletterModalExperienceHost: FunctionComponent<
  NewsletterModalExperienceHostProps
> = ({ scrollDistanceTrigger = 450 }) => {
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
};

export default NewsletterModalExperienceHost;
