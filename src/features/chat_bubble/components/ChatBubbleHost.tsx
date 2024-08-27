import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useAudio from '@/hooks/useAudio';
import History from '@/features/chat_bubble/components/HistoryOverlay';
import useSendNotification from '@/hooks/useSendNotification';
import { usePreferenceStore } from '@/state/preferences';
import { useRuntimeStore } from '@/state/runtime';

type HistoryItem = { text: string; isUser: boolean; time: Date };
const messages = [
  'Come on, let me help you!',
  `I can't hear you! Speak louder!`,
  'Who lives under the sea?',
  'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.',
  `Sorry, I'm going through a tunnel right now. Can you repeat that?`,
  `You must have missed my previous messages. I'm kind of lonely.`,
  `Wondering if my messages got caught in a time warp. Feeling like I'm at a party where everyone's speaking Simlish.`,
  `My messages must be on a ghosting spree. Feeling ignored.`,
  `Ah, the sweet sound of silence. My messages must be enjoying their newfound solitude.`,
];
const fallbackMessage = `It's nothing, leave me alone. 😤`;
const initialMessage = () => ({
  text: 'Hello! I am a chat bubble. I am here to help you. 🤓',
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
  const enableSound = usePreferenceStore((state) => state.enableSound);
  const hasInteracted = useRuntimeStore((state) => state.interactionUnlocked);
  const [history, setHistory] = useState([initialMessage()] as HistoryItem[]);
  const [isOpen, setIsOpen] = useState(false);
  const [badgeCounter, setBadgeCounter] = useState(1);
  const notification = useSendNotification();
  const notificationSfx = useAudio('/assets/sfx/notification_chord1.wav');

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
        title: 'New message!',
        body: message,
      });
    },
    [notification],
  );

  const addRandomBotMessage = useCallback(() => {
    const pool = messages.filter(
      (message) => !history.some((item) => item.text === message),
    );
    if (pool.length == 0) {
      pool.push(fallbackMessage);
    }
    const randomMessage = pool[Math.floor(Math.random() * pool.length)];
    addHistory(randomMessage, false);
    if (!isOpen) {
      setBadgeCounter((prev) => prev + 1);
      playSound();
      sendNotification(randomMessage);
    }
  }, [addHistory, history, isOpen, playSound, sendNotification]);

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
        className="z-30 flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary text-2xl text-on-primary"
        onClick={toggleHistory}>
        <FontAwesomeIcon icon={['fas', 'comment-dots']} />
        {badgeCounter > 0 && (
          <div className="absolute -right-2 -top-2 z-20 flex size-7 items-center justify-center rounded-full bg-error p-1 text-center text-xs text-on-error">
            <span>{badgeCounter}</span>
          </div>
        )}
      </button>
      <div className="absolute bottom-4 left-10 z-20 hidden max-h-screen-3/4 w-96 opacity-0 transition-visibility-opacity duration-300 group-data-[state=open]:block group-data-[state=open]:opacity-100">
        <History
          history={history}
          onUserMessage={(message) => addHistory(message, true)}
          onClose={closeHistory}
        />
      </div>
    </div>
  );
};

export default ChatBubbleHost;
