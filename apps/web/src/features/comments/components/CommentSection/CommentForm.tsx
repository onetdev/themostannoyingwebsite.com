'use client';

import {
  Button,
  CaptchaEmojiField,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FormError,
  Input,
  LoaderDots,
  Textarea,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';

import { useCommentForm } from '../../hooks';

export function CommentForm() {
  const t = useTranslations();
  const form = useCommentForm({
    onSuccess: () => {
      // Could show a success message or trigger a reload
    },
  });

  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const captchaFieldText = {
    label: t('form.captcha.field'),
    hint: t('form.captcha.captchaEmojiHint'),
  };

  return (
    <FormProvider {...form}>
      <form
        id="create-comment"
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormError error={errors.root} />

        <Field>
          <FieldLabel htmlFor="name">{t('comments.form.name')}</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              type="text"
              className="w-full"
              placeholder={t('comments.form.name')}
              {...register('name')}
            />
            <FieldError errors={[errors.name]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="content">
            {t('comments.form.comment')}
          </FieldLabel>
          <FieldContent>
            <Textarea
              id="content"
              className="w-full"
              placeholder={t('comments.form.comment')}
              {...register('content')}
            />
            <FieldError errors={[errors.content]} />
          </FieldContent>
        </Field>

        <CaptchaEmojiField
          text={captchaFieldText}
          required
          className="max-w-96"
        />

        <Button
          role="button"
          type="submit"
          className="mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting && <LoaderDots />}
          {!isSubmitting && t('comments.form.submit')}
        </Button>
      </form>
    </FormProvider>
  );
}
