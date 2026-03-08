'use client';

import { Badge, Button, Icon } from '@maw/ui-lib';

export interface ChatBubbleTriggerProps {
  onClick: () => void;
  counter: number;
}

export function ChatBubbleTrigger({
  onClick,
  counter,
}: ChatBubbleTriggerProps) {
  return (
    <div className="relative inline-block">
      <Button
        size="icon"
        variant="secondary"
        className="size-14 rounded-full shadow-lg"
        onClick={onClick}
      >
        <Icon icon="commentDots" className="text-md block md:text-2xl" />
      </Button>

      {counter > 0 && (
        <Badge className="absolute -top-3 -inset-e-1 h-7 min-w-7 rounded-full flex items-center justify-center px-1 bg-destructive text-destructive-foreground text-xs">
          {counter}
        </Badge>
      )}
    </div>
  );
}
