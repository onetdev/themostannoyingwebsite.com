'use client';

import { Alert, AlertDescription, AlertTitle, Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { ConfirmationPrint } from './ConfirmationPrint';

interface ConfirmationStepProps {
  onAbort: () => void;
  onSpecialDeal: () => void;
  onUpgrade: () => void;
}

export function ConfirmationStep({
  onAbort,
  onSpecialDeal,
  onUpgrade,
}: ConfirmationStepProps) {
  const t = useTranslations('subscription.cancellation.confirmation');
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="print:hidden space-y-6">
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-destructive underline">
            {t('title')}
          </h4>
          <p className="font-bold">{t('description')}</p>
        </div>

        <Alert variant="info">
          <AlertTitle>{t('alert.title')}</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside space-y-1">
              <li>{t('alert.step1')}</li>
              <li>{t('alert.step2')}</li>
              <li>{t('alert.step3')}</li>
              <li>{t('alert.step4')}</li>
              <li>{t('alert.step5')}</li>
              <li>
                {t.rich('alert.step6', {
                  email: (children) => (
                    <a
                      href="mailto:support@themostannoyingwebsite.com"
                      className="text-blue-600 underline"
                    >
                      {children}
                    </a>
                  ),
                })}
              </li>
            </ol>
            <strong className="pt-5 block">{t('alert.note')}</strong>
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2">
          <Button onClick={handlePrint} variant="outline" size="lg">
            {t('action.print')}
          </Button>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-border space-y-4">
          <p className="text-xs text-gray-500 italic">{t('alternative')}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button onClick={onAbort} variant="secondary" size="lg">
              {t('action.abort')}
            </Button>
            <Button onClick={onUpgrade} size="lg">
              {t('action.upgrade')}
            </Button>
            <Button
              onClick={onSpecialDeal}
              variant="outline"
              size="lg"
              className="col-span-2"
            >
              {t('action.specialDeal')}
            </Button>
          </div>
        </div>
      </div>

      {/* Print View - Only visible when printing */}
      <ConfirmationPrint />
    </div>
  );
}
