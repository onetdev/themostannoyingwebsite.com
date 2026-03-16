'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

export function ConfirmationPrint() {
  const t = useTranslations('subscription.cancellation.print');
  const { getValues } = useFormContext<CancellationFormData>();
  const documentId = useMemo(
    () => Math.random().toString(36).substring(2, 15).toUpperCase(),
    [],
  );
  const values = getValues();

  // Print View - Only visible when printing
  return (
    <div className="hidden print:block p-8 space-y-8 text-black bg-white min-h-screen">
      <div className="text-center border-b-4 border-black pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          {t('title')}
        </h1>
        <p className="text-sm font-bold">
          {t('documentId', { id: documentId })}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          {t('sections.account')}
        </h2>
        <div className="grid grid-cols-1 gap-2">
          <p>
            <span className="font-bold">{t('fields.email')}</span>{' '}
            {values.email}
          </p>
          <p>
            <span className="font-bold">{t('fields.date')}</span>{' '}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          {t('sections.details')}
        </h2>
        <div className="space-y-4">
          <div>
            <p className="font-bold">{t('fields.reason')}</p>
            <div className="p-2 border border-black min-h-[50px]">
              {values.reason}
            </div>
          </div>
          <div>
            <p className="font-bold">{t('fields.feedback')}</p>
            <div className="p-2 border border-black min-h-[200px] text-sm wrap-break-word whitespace-pre-wrap">
              {values.feedback}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 pt-8">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          {t('sections.signatures')}
        </h2>

        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.subscriber')}
              </p>
              <p className="text-xs mt-1 italic">{t('signatures.dateLabel')}</p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.subscriberName')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.witness1')}
              </p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.witness1Name')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.witness2')}
              </p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                {t('signatures.witness2Name')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-20 text-[10px] text-center italic">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}
