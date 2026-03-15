'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigationProvider } from '@/core/react';
import { useCancellationForm } from '../../hooks';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { EmailStep } from './steps/EmailStep';
import { EssayStep } from './steps/EssayStep';
import { ReasonsStep } from './steps/ReasonsStep';
import { UpsellStep } from './steps/UpsellStep';
import { ValdoStep } from './steps/ValdoStep';

type Step =
  | 'reasons'
  | 'feedback'
  | 'valdo'
  | 'upsell'
  | 'email'
  | 'confirmation';

const STEP_ORDER: Step[] = [
  'reasons',
  'feedback',
  'valdo',
  'upsell',
  'email',
  'confirmation',
];

export function UnsubscribePage() {
  const t = useTranslations('subscription.cancellation.page');
  const { push } = useNavigationProvider();
  const [step, setStep] = useState<Step>(STEP_ORDER[0]);
  const methods = useCancellationForm({
    onSuccess: () => {
      setStep('confirmation');
    },
  });

  const nextStep = useCallback(() => {
    setStep((current) => {
      const currentIndex = STEP_ORDER.indexOf(current);
      return STEP_ORDER[currentIndex + 1] ?? STEP_ORDER[STEP_ORDER.length - 1];
    });
  }, []);

  const handleAbort = () => {
    methods.reset();
    push('home');
  };

  const handleSpecialDeal = () => {
    push('plans.special-deal');
  };

  const handleUpgrade = () => {
    push('plans');
  };

  const renderStep = () => {
    switch (step) {
      case 'reasons':
        return <ReasonsStep onNext={nextStep} />;
      case 'feedback':
        return <EssayStep onNext={nextStep} onAbort={handleAbort} />;
      case 'valdo':
        return <ValdoStep onNext={nextStep} />;
      case 'upsell':
        return (
          <UpsellStep onNext={nextStep} onSpecialDeal={handleSpecialDeal} />
        );
      case 'email':
        return (
          <EmailStep onNext={nextStep} onSpecialDeal={handleSpecialDeal} />
        );
      case 'confirmation':
        return (
          <ConfirmationStep
            onAbort={handleAbort}
            onUpgrade={handleUpgrade}
            onSpecialDeal={handleSpecialDeal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto mt-10 w-full max-w-2xl border-4 border-border py-8 px-8 print:p-0 print:border-0 print:max-w-full print:m-0">
        <PageHeadline className="print:hidden">{t('title')}</PageHeadline>
        {renderStep()}
      </div>
    </FormProvider>
  );
}
