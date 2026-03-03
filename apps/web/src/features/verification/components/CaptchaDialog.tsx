'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
  Progress,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useEvent } from '@/core/events/react/useEvent';
import type { ChallengeType } from '../hooks/use-captcha-challenge';
import { EmojiCountChallenge } from './EmojiCountChallenge';
import { TaxonomyChallenge } from './TaxonomyChallenge';
import { TilePuzzleChallenge } from './TilePuzzleChallenge';

export interface CaptchaDialogProps {
  isOpen: boolean;
  type: ChallengeType;
  onResolved: () => void;
  onReset: () => void;
  onDismiss: () => void;
  progress: number;
}

export function CaptchaDialog({
  isOpen,
  type,
  onResolved,
  onReset,
  onDismiss,
  progress,
}: CaptchaDialogProps) {
  const t = useTranslations();
  const [selectedCount, setSelectedCount] = useState(0);

  useEvent('ui:modal:dismiss-signaled', () => onDismiss(), isOpen);

  const handleReset = () => {
    setSelectedCount(0);
    onReset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onDismiss();
    }
  };

  const buttonLabel = (() => {
    if (type === 'grid') {
      return selectedCount > 0 ? t('common.verify') : t('common.skip');
    }
    return t('common.next');
  })();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-fit gap-0 overflow-hidden p-0 border-border"
        showCloseButton={true}
      >
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle>{t('verification.captcha.challengeTitle')}</DialogTitle>
        </DialogHeader>
        <div className="py-2 px-5">
          <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
            <span>{t('verification.captcha.verificationProgress')}</span>
            <span>{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
        <div className="p-4">
          {type === 'emoji' && <EmojiCountChallenge onResolved={onResolved} />}
          {type === 'tile' && <TilePuzzleChallenge onResolved={onResolved} />}
          {type === 'grid' && (
            <TaxonomyChallenge onResolved={onResolved} className="mx-auto" />
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-border p-2">
          <div className="grow">
            <Button
              type="button"
              onClick={handleReset}
              title={t('verification.captcha.resetChallenge')}
              variant="ghost"
            >
              <Icon icon="rotate" className="size-5" />
            </Button>
          </div>
          <Button onClick={onResolved} size="sm" className="px-6 uppercase">
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
