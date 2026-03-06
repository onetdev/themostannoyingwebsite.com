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
import { useEffect } from 'react';
import { useEvent } from '@/core/events/react/useEvent';
import { useCaptchaChallenge } from '../hooks';
import { EmojiCountChallenge } from './EmojiCountChallenge';
import { TaxonomyChallenge } from './TaxonomyChallenge';
import { TilePuzzleChallenge } from './TilePuzzleChallenge';

export interface CaptchaDialogProps {
  isOpen: boolean;
  onFailed: () => void;
  onResolved: () => void;
}

export function CaptchaDialog({
  isOpen,
  onFailed,
  onResolved,
}: CaptchaDialogProps) {
  const {
    challengeType,
    completion,
    currentChallengeScore,
    handleChallengeScoreUpdate,
    handleDismiss,
    handleReset,
    handleSkip,
    handleStart,
    handleVerify,
  } = useCaptchaChallenge({
    onFailed,
    onResolved,
  });
  const t = useTranslations();

  useEvent('ui:modal:dismiss-signaled', () => handleDismiss(), isOpen);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onFailed();
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleStart();
    }
  }, [isOpen, handleStart]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-fit gap-0 overflow-hidden p-0 border-border"
        showCloseButton={true}
      >
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle>
            {t('humanVerification.captcha.challengeTitle')}
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 px-5">
          <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
            <span>{t('humanVerification.captcha.verificationProgress')}</span>
            <span>{completion.toFixed(2)}%</span>
          </div>
          <Progress value={completion} className="h-1" />
        </div>
        <div className="p-4">
          {challengeType === 'emoji' && (
            <EmojiCountChallenge
              onProgress={handleChallengeScoreUpdate}
              className="mx-auto"
            />
          )}
          {challengeType === 'tile' && (
            <TilePuzzleChallenge
              onProgress={handleChallengeScoreUpdate}
              className="mx-auto"
            />
          )}
          {challengeType === 'grid' && (
            <TaxonomyChallenge
              onProgress={handleChallengeScoreUpdate}
              className="mx-auto"
            />
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-border p-2">
          <div className="grow">
            <Button
              type="button"
              onClick={handleReset}
              title={t('humanVerification.captcha.resetChallenge')}
              variant="ghost"
            >
              <Icon icon="rotate" className="size-5" />
            </Button>
          </div>
          {currentChallengeScore < 1 && (
            <Button onClick={handleSkip} size="sm" className="px-6 uppercase">
              {t('common.action.skip')}
            </Button>
          )}
          {currentChallengeScore >= 1 && (
            <Button onClick={handleVerify} size="sm" className="px-6 uppercase">
              {t('common.action.verify')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
