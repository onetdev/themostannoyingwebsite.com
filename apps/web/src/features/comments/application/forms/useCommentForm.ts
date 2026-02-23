'use client';

import { useLogger } from '@maw/logger';
import { useForm } from 'react-hook-form';

import { CommentFormData, getCommentFormSchema } from './comment-form.schema';

import { useZodFormValidator } from '@/hooks';

interface UseCommentFormProps {
  onSuccess?: (data: CommentFormData) => void;
}

export function useCommentForm({ onSuccess }: UseCommentFormProps) {
  const logger = useLogger().getSubLogger({ name: 'useCommentForm' });
  const resolver = useZodFormValidator(getCommentFormSchema);
  const methods = useForm<CommentFormData>({
    resolver,
    defaultValues: {
      name: '',
      content: '',
      captcha: '',
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      logger.info(data, 'Comment submitted');
      onSuccess?.(data);
      methods.reset();
    } catch (err: unknown) {
      logger.warn(err, 'Comment submission failed');
      methods.setError('root', { message: (err as Error).message });
    }
  };

  return {
    ...methods,
    onSubmit,
  };
}
