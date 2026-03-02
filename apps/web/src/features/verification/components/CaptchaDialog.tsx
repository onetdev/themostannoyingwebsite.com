'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  Progress,
} from '@maw/ui-lib';
import { useState } from 'react';
import type { ChallengeType } from '../hooks/use-captcha-challenge';
import { CaptchaEmoji } from './CaptchaEmoji';
import { CaptchaGridSelect } from './CaptchaGridSelect';
import { CaptchaTilePuzzle } from './CaptchaTilePuzzle';

export interface CaptchaDialogProps {
  isOpen: boolean;
  type: ChallengeType;
  onResolved: () => void;
  onReset: () => void;
  gridPrompt: string;
  gridImage: string;
  progress: number;
  text: {
    emojiHint: string;
    tilePuzzleHint: string;
    gridSelectHint: string;
  };
  assets: {
    captchaTile: string;
  };
}

export function CaptchaDialog({
  isOpen,
  type,
  onResolved,
  onReset,
  gridPrompt,
  gridImage,
  progress,
  text,
  assets,
}: CaptchaDialogProps) {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleReset = () => {
    setSelectedCount(0);
    onReset();
  };

  const buttonLabel = (() => {
    if (type === 'grid') {
      return selectedCount > 0 ? 'Verify' : 'Skip';
    }
    return 'Next';
  })();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="max-w-fit p-0 overflow-hidden border-none bg-transparent shadow-none"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Captcha Challenge</DialogTitle>
        <div className="bg-background border shadow-xl flex flex-col">
          <div className="p-4">
            <div className="mb-4 space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>Verification Progress</span>
                <span>{progress.toFixed(2)}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
            {type === 'emoji' && (
              <>
                <p className="mb-2 text-sm">{text.emojiHint}</p>
                <CaptchaEmoji
                  width={300}
                  height={150}
                  onResolved={onResolved}
                />
              </>
            )}
            {type === 'tile' && (
              <>
                <p className="mb-2 text-sm">{text.tilePuzzleHint}</p>
                <CaptchaTilePuzzle
                  imageSrc={assets.captchaTile}
                  onResolved={onResolved}
                  cols={6}
                  rows={4}
                />
              </>
            )}
            {type === 'grid' && (
              <CaptchaGridSelect
                imageSrc={gridImage}
                prompt={gridPrompt}
                onResolved={onResolved}
                onSelectionChange={setSelectedCount}
                showFooter={false}
              />
            )}
          </div>

          <div className="flex items-center justify-between border-t p-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground p-2"
                title="Reset challenge"
              >
                <Icon icon="rotate" className="size-5" />
              </button>
            </div>
            <Button onClick={onResolved} size="sm" className="px-6 uppercase">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
