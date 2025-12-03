'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const newsletterFormSchema = z.object({
  email: z.email(),
});

type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export function useNewsletterForm() {
  const t = useTranslations();
  const methods = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
  });

  const onSubmit = async () => {
    alert(t('newsletter.modal.useFormActions'));
  };

  return {
    ...methods,
    onSubmit,
  };
}
