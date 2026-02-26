'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import {
  getNewsletterFormDataSchema,
  type NewsletterFormData,
} from '../schemas';

export function useNewsletterForm() {
  const t = useTranslations();
  const methods = useForm<NewsletterFormData>({
    resolver: zodResolver(getNewsletterFormDataSchema(t)),
  });

  const onSubmit = async () => {
    alert(t('newsletter.modal.useFormActions'));
  };

  return {
    ...methods,
    onSubmit,
  };
}
