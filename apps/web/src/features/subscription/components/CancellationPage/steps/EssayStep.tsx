'use client';

import { Button, Textarea } from '@maw/ui-lib';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface EssayStepProps {
  onAbort: () => void;
  onNext: () => void;
}

export function EssayStep({ onNext, onAbort }: EssayStepProps) {
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
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Exit Interview Essay</h4>
        <p className="text-sm">
          To ensure your decision is final and well-considered, please write an
          essay on your experience (min. 3000 characters). This will be
          personally reviewed by our CEO before processing.
        </p>
        <Textarea
          {...register('feedback')}
          placeholder="Start typing your 3000 character masterpiece here..."
          className="min-h-80"
          aria-invalid={!!errors.feedback}
        />
        <div className="flex justify-between text-xs">
          <span
            className={
              feedback.length < 3000 ? 'text-destructive' : 'text-success'
            }
          >
            Characters: {feedback.length} / 3000
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <Button onClick={onAbort} className="w-full text-lg h-14" size="lg">
          Cancel cancellation
        </Button>

        <Button
          variant="link"
          size="xs"
          onClick={handleNext}
          className="max-w-full whitespace-normal"
        >
          I have completed my mandatory essay and wish to proceed with the next
          verification step
        </Button>
      </div>
    </div>
  );
}
