'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface ReasonsStepProps {
  onNext: () => void;
}

export function ReasonsStep({ onNext }: ReasonsStepProps) {
  const t = useTranslations('subscription.cancellation.reasons');
  const { setValue } = useFormContext<CancellationFormData>();
  const reasons = t.raw('list') as string[];

  const handleReasonClick = (reason: string) => {
    setValue('reason', reason);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-bold">{t('title')}</h4>
        <p className="text-sm">{t('description')}</p>
      </div>
      <div className="space-y-2">
        {reasons.map((reason) => (
          <Button
            key={reason}
            variant="outline"
            size="lg"
            onClick={() => handleReasonClick(reason)}
            className="w-full justify-start text-left whitespace-break-spaces h-auto py-4"
          >
            {reason}
          </Button>
        ))}
      </div>
    </div>
  );
}
