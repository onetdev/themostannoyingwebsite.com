import { FunctionComponent, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/atoms/Button';
import FormFieldError from '@/components/atoms/FormFieldError';
import TextInput from '@/components/atoms/TextInput';
import Modal from '@/components/molecules/Modal';
import { type NewsletterFormInputs } from '@/features/newsletter';
import { random } from '@/lib/utils/math';
import { EMAIL_PATTERN } from '@/lib/utils/validator';
import { useTranslations } from 'next-intl';

type NewsletterModalProps = {
  visible?: boolean;
  onDismiss?: () => void;
};

const NewsletterModal: FunctionComponent<NewsletterModalProps> = ({
  visible = false,
  onDismiss,
}) => {
  const t = useTranslations();
  const [flipActions, setFlipActions] = useState(false);
  const [actions, setActions] = useState({
    confirm: t('newsletter.modal.initialConfirm'),
    cancel: t('newsletter.modal.initialCancel'),
  } as ConfirmItem satisfies ConfirmItem);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewsletterFormInputs>();

  const confirmPool = useMemo(
    () =>
      t('newsletter.modal.confirmations', {
        returnObjects: true,
        defaultValue: [],
      }) as ConfirmItem[],
    [t],
  );

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

  const onSubmit: SubmitHandler<NewsletterFormInputs> = (_data) => {
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
              {...register('email', {
                required: t('form.validation.error.required'),
                pattern: {
                  value: EMAIL_PATTERN,
                  message: t('form.validation.error.emailInvalid'),
                },
              })}
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
