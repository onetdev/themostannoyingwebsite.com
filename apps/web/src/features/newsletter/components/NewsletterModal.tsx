'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldError,
  Input,
  Separator,
} from '@maw/ui-lib';
import { randomNumber } from '@maw/utils/random';
import { useMessages, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { useEvent } from '@/core/events/react/useEvent';
import { useNewsletterForm } from '../hooks';

export interface NewsletterModalProps {
  visible?: boolean;
  onDismiss?: () => void;
}

export function NewsletterModal({
  visible = false,
  onDismiss,
}: NewsletterModalProps) {
  const t = useTranslations();
  const messages = useMessages();
  const [flipActions, setFlipActions] = useState(false);
  const [actions, setActions] = useState<ConfirmItem>({
    confirm: t('newsletter.modal.initialConfirm'),
    cancel: t('newsletter.modal.initialCancel'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
  } = useNewsletterForm();

  useEvent('ui:modal:dismiss-signaled', () => onDismiss?.(), visible);

  const confirmPool = useMemo(() => {
    const items = Object.keys(messages.newsletter.modal.confirmations).map(
      (key) =>
        ({
          confirm: t(
            `newsletter.modal.confirmations.${key}.confirm` as AppTranslationKey,
          ),
          cancel: t(
            `newsletter.modal.confirmations.${key}.cancel` as AppTranslationKey,
          ),
          text: t(
            `newsletter.modal.confirmations.${key}.text` as AppTranslationKey,
          ),
        }) satisfies ConfirmItem,
    );

    return items;
  }, [messages.newsletter.modal.confirmations, t]);

  const renderActions = () => {
    const buttons = [
      <Button key="cancel" variant="secondary" onClick={onDismiss}>
        {actions.cancel}
      </Button>,
      <Button key="confirm" onClick={randomConfirmation} disabled={!isValid}>
        {actions.confirm}
      </Button>,
    ];

    return <>{flipActions ? buttons : buttons.reverse()}</>;
  };

  const randomConfirmation = () => {
    const rnd = Math.floor(Math.random() * confirmPool.length);
    setActions(confirmPool[rnd]);
    setFlipActions(randomNumber(0, 1) === 0);
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onDismiss?.()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('newsletter.modal.title')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('newsletter.modal.description')}
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <form
          className="max-w-screen-sm"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          {actions.text && <p className="mb-4">{actions.text}</p>}
          {!actions.text && (
            <>
              <p className="mb-4">{t('newsletter.modal.description')}</p>
              <Input
                placeholder={t('newsletter.modal.placeholder')}
                type="email"
                inputSize="large"
                required
                {...register('email')}
              />
              <FieldError errors={[errors.email]} />
            </>
          )}
        </form>

        <DialogFooter>
          <div className="flex w-full gap-3">{renderActions()}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ConfirmItem = {
  text?: string;
  confirm: string;
  cancel: string;
};
