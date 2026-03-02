'use client';

import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
  LoaderDots,
  Textarea,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { FormProvider } from 'react-hook-form';
import { CaptchaField } from '@/features/verification/components';
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

  return (
    <FormProvider {...form}>
      <form
        id="create-comment"
        className="flex flex-col gap-5"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldError errors={[errors.root]} />

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

        <div className="max-w-96">
          <CaptchaField />
        </div>

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
