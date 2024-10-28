'use client';

import { FunctionComponent, useEffect, useState } from 'react';

import NewsletterModal from './components/NewsletterModal';

import useScrollDistanceTrigger from '@/hooks/useScrollDistanceTrigger';
import { useRuntimeStore } from '@/state/runtime';

export type NewsletterModalExperienceHostProps = {
  scrollDistanceTrigger?: number;
};
const NewsletterModalExperienceHost: FunctionComponent<
  NewsletterModalExperienceHostProps
> = ({ scrollDistanceTrigger = 450 }) => {
  const runtime = useRuntimeStore();
  const [modalVisible, setModalVisible] = useState(false);

  useScrollDistanceTrigger({
    threshold: scrollDistanceTrigger,
    onTrigger: () => setModalVisible(true),
  });

  useEffect(() => {
    if (runtime.document.hasEverBeenVisible && !runtime.document.isVisible) {
      setModalVisible(true);
    }
  }, [runtime.document.hasEverBeenVisible, runtime.document.isVisible]);

  const onModalDismiss = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <NewsletterModal visible={modalVisible} onDismiss={onModalDismiss} />
      )}
    </>
  );
};

export default NewsletterModalExperienceHost;
