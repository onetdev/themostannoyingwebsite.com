'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

interface UpsellStepProps {
  onSpecialDeal: () => void;
  onNext: () => void;
}

export function UpsellStep({ onSpecialDeal, onNext }: UpsellStepProps) {
  const t = useTranslations('subscription.cancellation.upsell');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-bold">{t('title')}</h4>
        <p className="text-sm">{t('description')}</p>
      </div>
      <p className="text-2xl font-bold py-10 px-5 rounded-2xl border-dotted border-2 border-destructive bg-destructive/10 whitespace-pre-wrap">
        {t('promo')}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={onSpecialDeal}
          variant="secondary"
          className="flex-1"
          size="lg"
        >
          {t('action.specialDeal')}
        </Button>
        <Button onClick={onSpecialDeal} className="flex-1" size="lg">
          {t('action.stay')}
        </Button>
      </div>
      <Button
        variant="link"
        size="xs"
        onClick={onNext}
        className="whitespace-break-spaces w-full text-center"
      >
        {t('action.next')}
      </Button>
    </div>
  );
}
