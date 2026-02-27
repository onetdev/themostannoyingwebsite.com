'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';
import { useEventBus } from '@/contexts/EventBusContext';
import { useZodFormValidator } from '@/hooks';
import { type EventTestFormData, getEventTestFormDataSchema } from '../schemas';

export const signupFormDefaultValues: EventTestFormData = {
  eventType: '',
  payload: '',
};

export function useEventTestForm() {
  const logger = useLogger().getSubLogger({ name: 'useEventTesterForm' });
  const { dispatch } = useEventBus();
  const resolver = useZodFormValidator(getEventTestFormDataSchema);
  const methods = useForm<EventTestFormData>({
    resolver,
    defaultValues: signupFormDefaultValues,
  });

  const onSubmit = async (data: EventTestFormData) => {
    try {
      const parsedPayload = data.payload ? JSON.parse(data.payload) : undefined;
      dispatch(data.eventType, parsedPayload);
    } catch (err: unknown) {
      logger.warn(err, 'JSON payload send error, trying empty send');
      // If it's not valid JSON, just send it as a string or empty
      dispatch(data.eventType);
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
