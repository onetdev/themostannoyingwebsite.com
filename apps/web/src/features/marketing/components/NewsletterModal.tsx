'use client';

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldError,
  Input,
  Label,
  Separator,
} from '@maw/ui-lib';
import { randomNumber } from '@maw/utils/random';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Link } from '@/core/i18n/navigation';
import { useEvent } from '@/core/react';
import { useVariantPool } from '@/features/content/hooks';
import { useNewsletterForm } from '../hooks';
import type { NewsletterConfirmation } from '../types';

export interface NewsletterModalProps {
  visible?: boolean;
  onDismiss?: () => void;
}

export function NewsletterModal({
  visible = false,
  onDismiss,
}: NewsletterModalProps) {
  const t = useTranslations('marketing.newsletterModal');
  const [flipActions, setFlipActions] = useState(false);
  const [actions, setActions] = useState<NewsletterConfirmation>({
    confirm: t('initialConfirm'),
    cancel: t('initialCancel'),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    onSubmit,
  } = useNewsletterForm();

  useEvent('ui:modal:dismiss-signaled', () => onDismiss?.(), visible);

  const confirmPool = useVariantPool('newsletter-confirmations');

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
    if (confirmPool.length === 0) {
      return;
    }

    const rnd = Math.floor(Math.random() * confirmPool.length);
    setActions(confirmPool[rnd]);
    setFlipActions(randomNumber(0, 1) === 0);
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onDismiss?.()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('description')}
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
            <div className="flex flex-col gap-4">
              <p>{t('description')}</p>
              <div>
                <Input
                  placeholder={t('placeholder')}
                  type="email"
                  inputSize="large"
                  required
                  {...register('email')}
                />
                <FieldError errors={[errors.email]} />
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  name="onlySpams"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <Checkbox
                      id="onlySpams"
                      checked={value}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  )}
                />
                <Label htmlFor="onlySpams">
                  {t('onlySpamsLabel')}{' '}
                  <Link
                    href="/only-spams"
                    className="text-primary hover:underline"
                    onClick={onDismiss}
                  >
                    {t('onlySpamsDetails')}
                  </Link>
                </Label>
              </div>
            </div>
          )}
        </form>

        <DialogFooter className="border-t border-border pt-5">
          <div className="flex w-full gap-3">{renderActions()}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
