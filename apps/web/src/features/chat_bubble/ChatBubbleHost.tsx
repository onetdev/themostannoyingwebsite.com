'use client';

import { Icon } from '@maw/ui-lib';
import {
  FunctionComponent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import HistoryOverlay from '@/features/chat_bubble/components/HistoryOverlay';
import useChatBubbleHistory from '@/features/chat_bubble/hooks/useChatBubbleHistory';

/**
 * This component should start off with an initial message so that we
 * have at least one interaction from the user.
 * Every time the user closes the chat bubble, we should add a new message
 * to the history now with a notification sound.
 */
const ChatBubbleHost: FunctionComponent = () => {
  const state = useChatBubbleHistory();
  const $ref = useRef<HTMLDivElement>(null);

  const closeHistory = useCallback(() => state.setForeground(false), [state]);
  const toggleHistory: MouseEventHandler<HTMLButtonElement> = () =>
    state.setForeground((prev) => !prev);
  const handleDocumentInteraction = useCallback(
    (event: Event) => {
      if (!$ref.current || $ref.current.contains(event.target as Node)) {
        return;
      }

      state.setForeground(false);
    },
    [state],
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentInteraction);
    return () =>
      document.removeEventListener('click', handleDocumentInteraction);
  }, [handleDocumentInteraction]);

  return (
    <div
      data-state={state.isForeground ? 'open' : 'closed'}
      className="group fixed bottom-2 left-2 z-20 flex md:bottom-4 md:left-4"
      ref={$ref}>
      <button
        className="bg-secondary text-on-secondary z-30 flex size-12 cursor-pointer items-center justify-center rounded-full text-2xl md:size-14"
        onClick={toggleHistory}>
        <span className="hidden md:block">
          <Icon icon="commentDots" size="3xl" />
        </span>
        <span className="block md:hidden">
          <Icon icon="commentDots" size="2xl" />
        </span>
        {state.badgeCounter > 0 && (
          <div className="bg-error text-on-error absolute -top-2 -right-2 z-20 flex size-6 items-center justify-center rounded-full p-1 text-center text-xs md:size-7">
            <span>{state.badgeCounter}</span>
          </div>
        )}
      </button>
      <div className="max-h-screen-3per4 transition-visibility-opacity absolute bottom-10 left-0 z-20 hidden w-80 opacity-0 duration-300 group-data-[state=open]:block group-data-[state=open]:opacity-100 md:bottom-4 md:left-10 md:w-96">
        <HistoryOverlay
          history={state.history}
          onUserMessage={(message) => state.add(message, 'user')}
          onClose={closeHistory}
          open={state.isForeground}
        />
      </div>
    </div>
  );
};

export default ChatBubbleHost;
