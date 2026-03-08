import { type RefObject, useCallback, useEffect } from 'react';

export interface UseInteractOutsideProps {
  $ref: RefObject<HTMLElement | null>;
  onInteraction: () => void;
}

export function useInteractOutside({
  $ref,
  onInteraction,
}: UseInteractOutsideProps) {
  const handleDocumentInteraction = useCallback(
    (event: Event) => {
      if (!$ref.current || $ref.current.contains(event.target as Node)) {
        return;
      }

      onInteraction();
    },
    [$ref.current, onInteraction],
  );

  useEffect(() => {
    document.addEventListener('click', handleDocumentInteraction);
    return () =>
      document.removeEventListener('click', handleDocumentInteraction);
  }, [handleDocumentInteraction]);
}
