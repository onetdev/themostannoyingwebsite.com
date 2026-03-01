'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';
import { emit } from '@/eventBus';
import { useZodFormValidator } from '@/hooks';
import { type EventTestFormData, getEventTestFormDataSchema } from '../schemas';

export const signupFormDefaultValues: EventTestFormData = {
  eventType: '',
  payload: '',
};

export function useEventTestForm() {
  const logger = useLogger().getSubLogger({ name: 'useEventTesterForm' });
  const resolver = useZodFormValidator(getEventTestFormDataSchema);
  const methods = useForm<EventTestFormData>({
    resolver,
    defaultValues: signupFormDefaultValues,
  });

  const onSubmit = async (data: EventTestFormData) => {
    try {
      const parsedPayload = data.payload ? JSON.parse(data.payload) : undefined;
      emit(data.eventType as keyof AppEvents, parsedPayload);
    } catch (err: unknown) {
      logger.error(err, 'Failed to emit message');
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
