import { useMessages, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { HistoryItem, OwnerType } from '../../domain';

import { useAudio, useSendNotification } from '@/core';
import { useRuntimeStore, useUserPreferencesStore } from '@/stores';

export function useChatBubbleHistory() {
  const t = useTranslations();
  const messages = useMessages();
  const enableSound = useUserPreferencesStore((state) => state.enableSound);
  const hasInteracted = useRuntimeStore(
    (state) => state.userActivation.unlocked,
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isForeground, setForeground] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(1);
  const notification = useSendNotification();
  const notificationSfx = useAudio('/assets/sfx/notification_chord1.wav');

  const botMessageVariants = useMemo(() => {
    const all = Object.keys(messages.chatBubble.messageVariants).map((key) =>
      t(`chatBubble.messageVariants.${key}`),
    );

    return all.filter(
      (message) => !history.some((item) => item.text === message),
    );
  }, [history, messages, t]);

  const add = useCallback((message: string, owner: OwnerType) => {
    setHistory((prev) => [...prev, { text: message, owner, time: new Date() }]);
  }, []);

  const playSound = useCallback(() => {
    if (!enableSound) return;

    notificationSfx.play();
  }, [enableSound, notificationSfx]);

  const sendNotification = useCallback(
    (message: string) => {
      notification.send({
        title: t('chatBubble.newAlert'),
        body: message,
      });
    },
    [notification, t],
  );

  const addRandomBotItem = useCallback(() => {
    if (botMessageVariants.length == 0) {
      botMessageVariants.push(t('chatBubble.messageFallback'));
    }
    const randomMessage =
      botMessageVariants[Math.floor(Math.random() * botMessageVariants.length)];

    add(randomMessage, 'bot');

    if (!isForeground) {
      setBadgeCounter((prev) => prev + 1);
      playSound();
      sendNotification(randomMessage);
    }
  }, [add, isForeground, botMessageVariants, playSound, sendNotification, t]);

  useEffect(() => {
    if (isForeground || !hasInteracted || badgeCounter > 0) {
      return;
    }

    const timer = setTimeout(() => addRandomBotItem(), 3000);
    return () => clearTimeout(timer);
  }, [isForeground, hasInteracted, addRandomBotItem, badgeCounter]);

  useEffect(() => {
    // We could watch if the user actually seen the message but chat window
    // moving into foreground it good enough.
    if (isForeground) {
      setBadgeCounter(0);
    }
  }, [isForeground]);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- just a mount effect
  useEffect(() => add(t('chatBubble.messageInitial'), 'bot'), []);

  return {
    add,
    badgeCounter,
    history,
    isForeground,
    setForeground,
  };
}
