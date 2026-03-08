'use client';

import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { useZodFormValidator } from '@/hooks';
import {
  type ContactFormData,
  getContactFormDataSchema,
} from '../schemas/contact-form-data';

export type ContactFormProps = {
  contactEmail: string;
  className?: string;
};

export function ContactForm({ contactEmail, className }: ContactFormProps) {
  const t = useTranslations();
  const resolver = useZodFormValidator(getContactFormDataSchema);
  const {
    register,
    control,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const [subject, message] = useWatch({
    control,
    name: ['subject', 'message'],
  });

  const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(message || '')}`;

  return (
    <div className={`flex flex-col gap-4 ${className ?? ''}`}>
      <Field>
        <FieldLabel htmlFor="subject" required>
          {t('app.contactForm.subject')}
        </FieldLabel>
        <FieldContent>
          <Input
            id="subject"
            placeholder={t('app.contactForm.placeholderSubject')}
            aria-invalid={!!errors.subject}
            {...register('subject')}
          />
          <FieldError errors={[errors.subject]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="message" required>
          {t('app.contactForm.message')}
        </FieldLabel>
        <FieldContent>
          <Textarea
            id="message"
            placeholder={t('app.contactForm.placeholderMessage')}
            rows={5}
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          <FieldError errors={[errors.message]} />
        </FieldContent>
      </Field>

      <Button
        asChild
        className="mt-2"
        variant={isValid ? 'default' : 'outline'}
        disabled={!isValid}
      >
        <a
          href={isValid ? mailtoUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => !isValid && e.preventDefault()}
        >
          {t('app.contactForm.send')}
        </a>
      </Button>
    </div>
  );
}
