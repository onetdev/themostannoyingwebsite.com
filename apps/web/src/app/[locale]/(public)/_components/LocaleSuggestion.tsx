'use client';

import { Button, Icon, toast } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useLocaleSuggestion } from '@/hooks';

export function LocaleSuggestion() {
  const { isReady, suggestedLocale, content, onAccept } = useLocaleSuggestion();
  const hasShownToast = useRef(false);
  const t = useTranslations();

  useEffect(() => {
    if (!isReady || !suggestedLocale || !content || hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    // A custom toast keeps the action and close controls inside a scoped
    // container; Sonner renders default toasts in a portal with no section.
    toast.custom(
      (id) => (
        <div
          className="flex w-full items-start gap-3"
          data-track-section="common:locale-suggestion"
        >
          <p className="flex-1 text-sm">{content.message}</p>
          <Button
            size="sm"
            variant="secondary"
            data-track="locale-suggestion:accept"
            onClick={() => {
              onAccept();
              toast.dismiss(id);
            }}
          >
            {content.changeAction}
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label={t('common.action.close')}
            data-track="locale-suggestion:dismiss"
            onClick={() => toast.dismiss(id)}
          >
            <Icon icon="close" />
          </Button>
        </div>
      ),
      { duration: Infinity },
    );
  }, [isReady, suggestedLocale, onAccept, content, t]);

  return null;
}
