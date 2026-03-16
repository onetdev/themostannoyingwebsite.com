'use client';

import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface EmailStepProps {
  onNext: () => void;
  onSpecialDeal: () => void;
}

export function EmailStep({ onNext, onSpecialDeal }: EmailStepProps) {
  const t = useTranslations('subscription.cancellation.email');
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<CancellationFormData>();

  const handleNext = async () => {
    const isValid = await trigger('email', { shouldFocus: true });
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold">{t('title')}</h4>
      <Field>
        <FieldLabel htmlFor="email" required>
          {t('label')}
        </FieldLabel>
        <FieldContent>
          <Input
            id="email"
            type="email"
            placeholder={t('placeholder')}
            aria-invalid={!!errors.email}
            inputSize="large"
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </FieldContent>
      </Field>
      <div className="space-y-4">
        <Button onClick={onSpecialDeal} className="w-full" size="lg">
          {t('action.discount')}
        </Button>
        <Button
          onClick={handleNext}
          variant="link"
          size="xs"
          className="w-full"
        >
          {t('action.next')}
        </Button>
      </div>
    </div>
  );
}
