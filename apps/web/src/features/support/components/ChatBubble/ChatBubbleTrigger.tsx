'use client';

import { Badge, Button, Icon } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useRuntimeStore } from '@/stores';

export interface ChatBubbleTriggerProps {
  onClick: () => void;
  counter: number;
  isOpen?: boolean;
}

export function ChatBubbleTrigger({
  onClick,
  counter,
  isOpen = false,
}: ChatBubbleTriggerProps) {
  const t = useTranslations('support.chatBubble');
  const label = isOpen ? t('triggerClose') : t('trigger');
  const controls = useAnimation();
  const reducedMotion = useRuntimeStore((state) => state.systemReducedMotion);
  const hasUnread = counter > 0;

  useEffect(() => {
    if (counter <= 0) {
      return;
    }

    controls.start({
      x: [0, -10, 10, -10, 10, -10, 10, 0],
      y: [0, 5, -5, 5, -5, 5, -5, 0],
      rotate: [0, -2, 2, -2, 2, -2, 2, 0],
      transition: { duration: 0.4 },
    });
  }, [controls, counter]);

  return (
    <motion.div animate={controls} className="relative inline-block">
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          'border-spin size-14 rounded-full shadow-lg hover:scale-105 hover:bg-secondary active:scale-95',
          hasUnread && 'spin-duration-2500',
        )}
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
        data-testid="chat-bubble-trigger"
        onClick={onClick}
        aria-label={label}
        title={label}
      >
        <Icon icon="commentDots" className="text-xl block md:text-2xl" />
      </Button>

      <AnimatePresence>
        {hasUnread && (
          <motion.div
            key={counter}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            className="absolute -top-3 -inset-e-1"
          >
            <Badge className="h-7 min-w-7 rounded-full flex items-center justify-center px-1 bg-destructive text-destructive-foreground text-xs shadow-md">
              {counter}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
