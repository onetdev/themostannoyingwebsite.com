'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { useEvent } from '@/hooks';

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};

export function NotificationManualModal({
  visible = false,
  onDismiss,
}: ManualModalProps) {
  const t = useTranslations();

  useEvent('ui:modal:dismiss-signaled', onDismiss, visible);

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent showCloseButton={false} className="top-5 translate-y-0">
        <DialogHeader>
          <DialogTitle>{t('user.notification.modal.title')}</DialogTitle>
          <DialogDescription>
            {t('user.notification.modal.description')}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onDismiss} className="mt-3">
          {t('common.action.dismiss')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
