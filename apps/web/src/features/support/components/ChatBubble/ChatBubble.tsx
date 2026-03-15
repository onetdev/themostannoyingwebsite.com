'use client';

import { FadeIn } from '@maw/ui-lib';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { useFaviconBadge, useInteractOutside } from '@/hooks';
import { useChatBubbleHistory } from '../../hooks';
import { ChatBubbleTrigger } from './ChatBubbleTrigger';
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

  useFaviconBadge(state.badgeCounter > 0);

  const closeHistory = useCallback(() => state.setForeground(false), [state]);
  const toggleHistory = () => state.setForeground((prev) => !prev);
  useInteractOutside({ $ref, onInteraction: closeHistory });

  return (
    <FadeIn
      y={20}
      className="fixed bottom-2 inset-s-2 z-20 flex md:bottom-4 md:inset-s-4"
      ref={$ref}
    >
      {state.audio}
      <ChatBubbleTrigger
        onClick={toggleHistory}
        counter={state.badgeCounter}
        isOpen={state.isForeground}
      />
      <AnimatePresence>
        {state.isForeground && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="max-h-screen-3per4 absolute bottom-14 inset-s-0 z-20 w-[95vw] md:bottom-16 md:inset-s-4 md:w-96"
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
    </FadeIn>
  );
}
