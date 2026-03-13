'use client';

import { Badge, Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

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

  return (
    <div className="relative inline-block">
      <Button
        size="icon"
        variant="secondary"
        className="size-14 rounded-full shadow-lg"
        onClick={onClick}
        aria-label={label}
        title={label}
      >
        <Icon icon="commentDots" className="text-xl block md:text-2xl" />
      </Button>

      {counter > 0 && (
        <Badge className="absolute -top-3 -inset-e-1 h-7 min-w-7 rounded-full flex items-center justify-center px-1 bg-destructive text-destructive-foreground text-xs">
          {counter}
        </Badge>
      )}
    </div>
  );
}
