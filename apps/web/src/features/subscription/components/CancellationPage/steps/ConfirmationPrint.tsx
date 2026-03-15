'use client';

import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

export function ConfirmationPrint() {
  const { getValues } = useFormContext<CancellationFormData>();
  const values = getValues();

  // Print View - Only visible when printing
  return (
    <div className="hidden print:block p-8 space-y-8 text-black bg-white min-h-screen">
      <div className="text-center border-b-4 border-black pb-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Official Unsubscription Request Form
        </h1>
        <p className="text-sm font-bold">
          Document ID:{' '}
          {Math.random().toString(36).substring(2, 15).toUpperCase()}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          1. ACCOUNT INFORMATION
        </h2>
        <div className="grid grid-cols-1 gap-2">
          <p>
            <span className="font-bold">Email Address:</span> {values.email}
          </p>
          <p>
            <span className="font-bold">Date of Request:</span>{' '}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          2. CANCELLATION DETAILS
        </h2>
        <div className="space-y-4">
          <div>
            <p className="font-bold">Primary Reason for Leaving:</p>
            <div className="p-2 border border-black min-h-[50px]">
              {values.reason}
            </div>
          </div>
          <div>
            <p className="font-bold">Detailed Feedback:</p>
            <div className="p-2 border border-black min-h-[200px] text-sm wrap-break-word whitespace-pre-wrap">
              {values.feedback}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 pt-8">
        <h2 className="text-xl font-bold border-b-2 border-black pb-1">
          3. SIGNATURES & WITNESSES
        </h2>

        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                Subscriber Signature
              </p>
              <p className="text-xs mt-1 italic">Date: ____________________</p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                Subscriber Printed Name
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">Witness 1 Signature</p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                Witness 1 Printed Name
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">Witness 2 Signature</p>
            </div>
            <div className="border-t-2 border-black pt-2">
              <p className="text-xs font-bold uppercase">
                Witness 2 Printed Name
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-20 text-[10px] text-center italic">
        <p>
          This is not a real document, just another satiric reflection of
          trends. See themostannoyingwebsite.com/en/terms-of-use and
          themostannoyingwebsite.com/en/privacy-policy for more information.
        </p>
      </footer>
    </div>
  );
}
