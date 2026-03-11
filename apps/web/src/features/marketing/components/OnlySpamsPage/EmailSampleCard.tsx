'use client';

import { Badge, Button, Separator } from '@maw/ui-lib';
import { emit } from '@/core/events/event-bus';

interface EmailSampleCardProps {
  subject: string;
  body: string;
}

export function EmailSampleCard(email: EmailSampleCardProps) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-lg h-full">
      <div className="bg-muted/30 p-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="font-semibold text-muted-foreground min-w-16">
            Sender:
          </span>
          <span className="font-medium">
            OnlySpams &lt;spam@themostannoyingwebsite.com&gt;
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-muted-foreground min-w-16">
            Subject:
          </span>
          <span className="font-medium">{email.subject}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-muted-foreground min-w-16">
            Folder:
          </span>
          <Badge variant="destructive" className="font-bold">
            SPAM
          </Badge>
        </div>
      </div>
      <Separator />

      <div className="p-6 prose prose-sm max-w-none text-muted-foreground leading-relaxed italic">
        {email.body}
      </div>

      <Separator />
      <div className="mt-auto p-4">
        <div className="flex justify-center">
          <Button
            variant="default"
            className="font-bold"
            onClick={() => emit('ui:newsletter-modal:show')}
          >
            I'M INTERESTED
          </Button>
        </div>
      </div>
    </div>
  );
}
