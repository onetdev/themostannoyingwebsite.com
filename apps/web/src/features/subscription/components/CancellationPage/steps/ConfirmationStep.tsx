'use client';

import { Alert, AlertDescription, AlertTitle, Button } from '@maw/ui-lib';
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
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="print:hidden space-y-4">
        <h2 className="text-xl font-bold text-destructive underline">
          FINAL VERIFICATION REQUIRED
        </h2>
        <p className="font-bold">
          Your request has been prepared, but for security reasons and to
          prevent accidental un-subscriptions, you must now complete the
          physical verification process.
        </p>

        <Alert variant="info">
          <AlertTitle>Instructions:</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal list-inside space-y-1">
              <li>Click the "Print for verification" button below.</li>
              <li>Print the document on physical paper.</li>
              <li>Sign the document in the presence of TWO (2) witnesses.</li>
              <li>Have both witnesses sign.</li>
              <li>Take a high-resolution photo of the signed document.</li>
              <li>
                Email the photo to{' '}
                <a
                  href="mailto:support@themostannoyingwebsite.com"
                  className="text-blue-600 underline"
                >
                  support@themostannoyingwebsite.com
                </a>
              </li>
            </ol>
            <strong className="pt-5">
              Please note that processing takes up to 10^15 business days.
            </strong>
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2">
          <Button onClick={handlePrint} variant="outline" size="lg">
            🖨️ PRINT FOR VERIFICATION 🖨️
          </Button>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-border">
          <p className="text-xs text-gray-500 italic">
            Alternatively, if you've changed your mind (highly recommended):
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button onClick={onAbort} variant="secondary">
              Keep My Subscription
            </Button>
            <Button onClick={onUpgrade}>Upgrade Now</Button>
            <Button
              onClick={onSpecialDeal}
              variant="outline"
              className="col-span-2"
            >
              Get the special deal
            </Button>
          </div>
        </div>
      </div>

      {/* Print View - Only visible when printing */}
      <ConfirmationPrint />
    </div>
  );
}
