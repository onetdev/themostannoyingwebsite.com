'use client';

import { Icon } from '@maw/ui-lib';
import { AnimatePresence, motion } from 'framer-motion';
import { type MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import { useChatBubbleHistory } from '../../hooks';
import { HistoryOverlay } from './HistoryOverlay';

/**
 * This component should start off with an initial message so that we
 * have at least one interaction from the user.
 * Every time the user closes the chat bubble, we should add a new message
 * to the history now with a notification sound.
 */
export function ChatBubble() {
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
      className="fixed bottom-2 left-2 z-20 flex md:bottom-4 md:left-4"
      ref={$ref}
    >
      <button
        type="button"
        className="bg-secondary text-on-secondary z-30 flex size-12 cursor-pointer items-center justify-center rounded-full text-2xl shadow-lg md:size-14"
        onClick={toggleHistory}
      >
        <Icon icon="commentDots" className="text-md block md:text-2xl" />
        {state.badgeCounter > 0 && (
          <div className="bg-error text-on-error absolute -top-2 -right-2 z-20 flex size-6 items-center justify-center rounded-full p-1 text-center text-xs md:size-7">
            <span>{state.badgeCounter}</span>
          </div>
        )}
      </button>

      <AnimatePresence>
        {state.isForeground && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="max-h-screen-3per4 absolute bottom-14 left-0 z-20 w-[95vw] md:bottom-16 md:left-4 md:w-96"
          >
            <HistoryOverlay
              history={state.history}
              onUserMessage={(message) => state.add(message, 'user')}
              onClose={closeHistory}
              open={state.isForeground}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
