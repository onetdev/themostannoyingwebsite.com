'use client';

import { useForm } from 'react-hook-form';
import { useLogger } from '@/core/react';
import { useZodFormValidator } from '@/hooks';
import {
  type CancellationFormData,
  getCancellationFormDataSchema,
} from '../schemas';

interface UseCancellationFormProps {
  onSuccess?: (data: CancellationFormData) => void;
}

export function useCancellationForm({
  onSuccess,
}: UseCancellationFormProps = {}) {
  const logger = useLogger('useCancellationForm');
  const resolver = useZodFormValidator(getCancellationFormDataSchema);
  const methods = useForm<CancellationFormData>({
    resolver,
    defaultValues: {
      reason: '',
      feedback: '',
      email: '',
    },
  });

  const onSubmit = async (data: CancellationFormData) => {
    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logger.info(data, 'Cancellation submitted');
      onSuccess?.(data);
    } catch (err: unknown) {
      logger.warn(err, 'Cancellation submission failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
}
