'use client';

import { Button, Textarea } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface EssayStepProps {
  onAbort: () => void;
  onNext: () => void;
}

export function EssayStep({ onNext, onAbort }: EssayStepProps) {
  const t = useTranslations('subscription.cancellation.essay');
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<CancellationFormData>();

  const feedback = watch('feedback') || '';

  const handleNext = async () => {
    const isValid = await trigger('feedback');
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-bold">{t('title')}</h4>
        <p className="text-sm">{t('description')}</p>
      </div>
      <Textarea
        {...register('feedback')}
        placeholder={t('placeholder')}
        className="min-h-80"
        aria-invalid={!!errors.feedback}
      />
      <div className="flex justify-between text-xs">
        <span
          className={
            feedback.length < 3000 ? 'text-destructive' : 'text-success'
          }
        >
          {t('characters', { count: feedback.length })}
        </span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button onClick={onAbort} className="w-full" size="lg">
          {t('action.abort')}
        </Button>

        <Button
          variant="link"
          size="xs"
          onClick={handleNext}
          className="max-w-full whitespace-normal"
        >
          {t('action.next')}
        </Button>
      </div>
    </div>
  );
}
