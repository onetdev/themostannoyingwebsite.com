'use client';

import { toast } from '@maw/ui-lib';
import { useEffect, useRef } from 'react';
import { useLocaleSuggestion } from '@/hooks';

export function LocaleSuggestion() {
  const { isReady, suggestedLocale, content, onAccept } = useLocaleSuggestion();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isReady || !suggestedLocale || !content || hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;
    toast(content.message, {
      action: {
        label: content.changeAction,
        onClick: onAccept,
      },
      duration: Infinity,
      closeButton: true,
    });
  }, [isReady, suggestedLocale, onAccept, content]);

  return null;
}
