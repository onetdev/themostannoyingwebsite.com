import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormFieldError, Modal, TextInput } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useMessages, useTranslations } from 'next-intl';
import { FunctionComponent, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type NewsletterModalProps = {
  visible?: boolean;
  onDismiss?: () => void;
};

const newsletterSchema = z.object({
  email: z.string().email(),
});

type NewsletterFormInputs = z.infer<typeof newsletterSchema>;

const NewsletterModal: FunctionComponent<NewsletterModalProps> = ({
  visible = false,
  onDismiss,
}) => {
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
  } = useForm<NewsletterFormInputs>({
    resolver: zodResolver(newsletterSchema),
  });

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

  const onSubmit: SubmitHandler<NewsletterFormInputs> = () => {
    alert(t('newsletter.modal.useFormActions'));
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
            <TextInput
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
};

type ConfirmItem = {
  text?: string;
  confirm: string;
  cancel: string;
};

export default NewsletterModal;
