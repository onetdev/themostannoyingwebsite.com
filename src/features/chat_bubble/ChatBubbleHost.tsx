import { useTranslation } from 'next-i18next';
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { HistoryItem } from './types';

import Icon from '@/components/atoms/Icon';
import History from '@/features/chat_bubble/components/HistoryOverlay';
import useAudio from '@/hooks/useAudio';
import useSendNotification from '@/hooks/useSendNotification';
import { useRuntimeStore } from '@/state/runtime';
import { useUserPreferencesStore } from '@/state/user_preferences';

const initialMessage = (text: string) => ({
  text,
  isUser: false,
  time: new Date(),
});

/**
 * This component should start off with an initial message so that we
 * have at least one interaction from the user.
 * Every time the user closes the chat bubble, we should add a new message
 * to the history now with a notification sound.
 */
const ChatBubbleHost: FunctionComponent = () => {
  const { t } = useTranslation('chat_bubble');
  const enableSound = useUserPreferencesStore((state) => state.enableSound);
  const hasInteracted = useRuntimeStore((state) => state.interactionUnlocked);
  const [history, setHistory] = useState([
    initialMessage(t('messageInitial')),
  ] as HistoryItem[]);
  const [isOpen, setIsOpen] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(1);
  const notification = useSendNotification();
  const notificationSfx = useAudio('/assets/sfx/notification_chord1.wav');

  const messages = t('messages', {
    returnObjects: true,
    defaultValue: [],
  }) as string[];

  const preventClose: MouseEventHandler = (e) => e.stopPropagation();
  const addHistory = useCallback((message: string, isUser: boolean) => {
    setHistory((prev) => [
      ...prev,
      { text: message, isUser, time: new Date() },
    ]);
  }, []);

  const playSound = useCallback(() => {
    if (!enableSound) return;

    notificationSfx.play();
  }, [enableSound, notificationSfx]);

  const sendNotification = useCallback(
    (message: string) => {
      notification.send({
        title: t('newAlert'),
        body: message,
      });
    },
    [notification, t],
  );

  const addRandomBotMessage = useCallback(() => {
    const pool = messages.filter(
      (message) => !history.some((item) => item.text === message),
    );
    if (pool.length == 0) {
      pool.push(t('messageFallback'));
    }
    const randomMessage = pool[Math.floor(Math.random() * pool.length)];
    addHistory(randomMessage, false);
    if (!isOpen) {
      setBadgeCounter((prev) => prev + 1);
      playSound();
      sendNotification(randomMessage);
    }
  }, [addHistory, history, isOpen, messages, playSound, sendNotification, t]);

  const closeHistory = () => setIsOpen(false);
  const toggleHistory: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (!isOpen) {
        setBadgeCounter(0);
      }
      setIsOpen(!isOpen);
    }, [isOpen]);

  useEffect(() => {
    if (isOpen || !hasInteracted || badgeCounter > 0) {
      return;
    }

    const timer = setTimeout(() => addRandomBotMessage(), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted, addRandomBotMessage, badgeCounter]);

  useEffect(() => {
    document.addEventListener('click', closeHistory);
    return () => {
      document.removeEventListener('click', closeHistory);
    };
  }, []);

  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className="group fixed bottom-4 left-4 z-20 flex"
      onClick={preventClose}>
      <button
        className="z-30 flex size-14 cursor-pointer items-center justify-center rounded-full bg-secondary text-2xl text-on-secondary"
        onClick={toggleHistory}>
        <Icon icon="commentDots" size="3xl" />
        {badgeCounter > 0 && (
          <div className="absolute -right-2 -top-2 z-20 flex size-7 items-center justify-center rounded-full bg-error p-1 text-center text-xs text-on-error">
            <span>{badgeCounter}</span>
          </div>
        )}
      </button>
      <div className="absolute bottom-10 left-0 z-20 hidden max-h-screen-3/4 w-80 opacity-0 transition-visibility-opacity duration-300 group-data-[state=open]:block group-data-[state=open]:opacity-100 md:bottom-4 md:left-10 md:w-96">
        {isOpen && (
          <History
            history={history}
            onUserMessage={(message) => addHistory(message, true)}
            onClose={closeHistory}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubbleHost;
