'use client';

import { Button } from '@maw/ui-lib';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface ReasonsStepProps {
  onNext: () => void;
}

const REASONS = [
  'MAW fixed all my problems in my life. However, I miss the sadness.',
  'I have the financial discipline of a raccoon in a vending machine.',
  'I’m cancelling before my friends discover how much I enjoyed this.',
  'I am once again running from my problems like a cartoon character.',
  'Too taxing on my PC',
  'Commitment issues.',
  'I simply cannot handle this much personal growth.',
  'My mom figured out that I was using her credit card',
];

export function ReasonsStep({ onNext }: ReasonsStepProps) {
  const { setValue } = useFormContext<CancellationFormData>();

  const handleReasonClick = (reason: string) => {
    setValue('reason', reason);
    onNext();
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold">Reason</h4>
      <p className="text-sm">
        It is really difficult to believe that you want to cowardly cancel your
        subscription. Why???
      </p>
      <div className="space-y-2">
        {REASONS.map((reason) => (
          <Button
            key={reason}
            variant="outline"
            onClick={() => handleReasonClick(reason)}
            className="w-full justify-start text-left"
          >
            {reason}
          </Button>
        ))}
      </div>
    </div>
  );
}
