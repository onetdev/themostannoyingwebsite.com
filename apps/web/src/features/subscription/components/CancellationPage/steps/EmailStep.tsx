'use client';

import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Input,
} from '@maw/ui-lib';
import { useFormContext } from 'react-hook-form';
import type { CancellationFormData } from '../../../schemas';

interface EmailStepProps {
  onNext: () => void;
  onSpecialDeal: () => void;
}

export function EmailStep({ onNext, onSpecialDeal }: EmailStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CancellationFormData>();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-bold">Who are you?</h4>
        <Field>
          <FieldLabel htmlFor="email" required>
            Provide your email address for the cancellation process.
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="loyal-customer@themostannoyingwebsite.com"
              aria-invalid={!!errors.email}
              inputSize="large"
              {...register('email')}
            />
            <FieldError errors={[errors.email]} />
          </FieldContent>
        </Field>
      </div>
      <div className="space-y-4">
        <Button onClick={onSpecialDeal} className="w-full" size="lg">
          You know what, I changed my mind, I want the discount!
        </Button>
        <Button
          onClick={onNext}
          variant="link"
          disabled={!!errors.email}
          className="w-full text-xs"
        >
          I'm sure, let's continue cancellation
        </Button>
      </div>
    </div>
  );
}
