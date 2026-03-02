'use client';

import { Dialog, DialogContent, DialogTitle, Icon } from '@maw/ui-lib';
import { useCallback, useState } from 'react';
import { CaptchaEmoji } from './CaptchaEmoji';
import { CaptchaGridSelect } from './CaptchaGridSelect';
import { CaptchaTilePuzzle } from './CaptchaTilePuzzle';

export type CaptchaCheckboxChallengeProps = {
  onResolved?: () => void;
  text: {
    proveYouAreRobot: string;
    emojiHint: string;
    tilePuzzleHint: string;
    gridSelectHint: string;
    gridSelectPrompts: string[];
  };
  assets: {
    captchaTile: string;
    captchaRandom: string[];
  };
};

type ChallengeType = 'emoji' | 'tile' | 'grid';

export function CaptchaCheckboxChallenge({
  onResolved,
  text,
  assets,
}: CaptchaCheckboxChallengeProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'challenge'>(
    'idle',
  );
  const [challengeType, setChallengeType] = useState<ChallengeType>('emoji');
  const [gridPrompt, setGridPrompt] = useState('');
  const [gridImage, setGridImage] = useState('');

  const pickRandomChallenge = useCallback(() => {
    const types: ChallengeType[] = ['emoji', 'tile', 'grid'];
    const selected = types[Math.floor(Math.random() * types.length)];
    setChallengeType(selected);

    if (selected === 'grid') {
      const prompt =
        text.gridSelectPrompts[
          Math.floor(Math.random() * text.gridSelectPrompts.length)
        ];
      const image =
        assets.captchaRandom[
          Math.floor(Math.random() * assets.captchaRandom.length)
        ];
      setGridPrompt(prompt);
      setGridImage(image);
    }
  }, [text.gridSelectPrompts, assets.captchaRandom]);

  const handleCheckboxClick = () => {
    if (status !== 'idle') {
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      pickRandomChallenge();
      setStatus('challenge');
    }, 2000);
  };

  const handleChallengeResolved = () => {
    // In this annoying website, resolving a challenge just gives you another one
    pickRandomChallenge();
  };

  return (
    <div className="flex items-center">
      <div
        className="bg-muted flex h-20 w-full max-w-[300px] items-center justify-between border p-3 shadow-sm select-none"
        onClick={handleCheckboxClick}
      >
        <div className="flex items-center gap-3">
          <div className="border-input flex size-7 items-center justify-center rounded-sm border bg-white">
            {status === 'loading' && (
              <Icon icon="spinner" className="text-primary animate-spin" />
            )}
            {status === 'challenge' && (
              <Icon icon="spinner" className="text-primary animate-spin" />
            )}
          </div>
          <span className="text-sm font-medium">{text.proveYouAreRobot}</span>
        </div>
        <div className="flex flex-col items-center opacity-50">
          <Icon icon="checkCircle" className="text-2xl" />
          <span className="text-[8px] uppercase">reCAPTCHA</span>
          <div className="flex gap-1 text-[8px]">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>

      <Dialog open={status === 'challenge'}>
        <DialogContent
          className="max-w-fit p-0 overflow-hidden border-none bg-transparent shadow-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Captcha Challenge</DialogTitle>
          {challengeType === 'emoji' && (
            <div className="bg-background border p-4 shadow-xl">
              <p className="mb-2 text-sm">{text.emojiHint}</p>
              <CaptchaEmoji
                width={300}
                height={150}
                onResolved={handleChallengeResolved}
              />
            </div>
          )}
          {challengeType === 'tile' && (
            <div className="bg-background border p-4 shadow-xl">
              <p className="mb-2 text-sm">{text.tilePuzzleHint}</p>
              <CaptchaTilePuzzle
                imageSrc={assets.captchaTile}
                onResolved={handleChallengeResolved}
                cols={6}
                rows={4}
              />
            </div>
          )}
          {challengeType === 'grid' && (
            <CaptchaGridSelect
              imageSrc={gridImage}
              prompt={gridPrompt}
              onResolved={handleChallengeResolved}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
