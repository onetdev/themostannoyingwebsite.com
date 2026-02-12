import { Button, FormFieldError, Modal, Input } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useMessages, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { useNewsletterForm } from '../../application/forms/useNewsletterForm';

type NewsletterModalProps = {
  visible?: boolean;
  onDismiss?: () => void;
};

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

  const confirmPool = useMemo(() => {
    const items = Object.keys(messages.newsletter.modal.confirmations).map(
      (key) =>
        ({
          confirm: t(`newsletter.modal.confirmations.${key}.confirm`),
          cancel: t(`newsletter.modal.confirmations.${key}.cancel`),
          text: t(`newsletter.modal.confirmations.${key}.text`),
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
    setFlipActions(random(0, 1) === 0);
  };

  return (
    <Modal
      visible={visible}
      title={t('newsletter.modal.title')}
      onClose={onDismiss}
      actions={<div className="flex gap-3">{renderActions()}</div>}>
      <form
        className="max-w-screen-sm"
        method="post"
        onSubmit={handleSubmit(onSubmit)}>
        {actions.text && <p className="mb-4">{actions.text}</p>}
        {!actions.text && (
          <>
            <p className="mb-4">{t('newsletter.modal.description')}</p>
            <Input
              placeholder={t('newsletter.modal.placeholder')}
              size="lg"
              type="email"
              className="w-full"
              required
              {...register('email')}
            />
            <FormFieldError error={errors.email} />
          </>
        )}
      </form>
    </Modal>
  );
}

type ConfirmItem = {
  text?: string;
  confirm: string;
  cancel: string;
};
