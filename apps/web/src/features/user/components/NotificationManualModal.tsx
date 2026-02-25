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

type ManualModalProps = {
  visible?: boolean;
  onDismiss: () => void;
};

export function NotificationManualModal({
  visible = false,
  onDismiss,
}: ManualModalProps) {
  const t = useTranslations();

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent showCloseButton={false} className="top-5 translate-y-0">
        <DialogHeader>
          <DialogTitle>{t('notification.modal.title')}</DialogTitle>
          <DialogDescription>
            {t('notification.modal.description')}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onDismiss} className="mt-3">
          {t('common.dismiss')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
