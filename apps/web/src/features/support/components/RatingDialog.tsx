'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@maw/ui-lib';
import { clsx } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useAppConfigContext } from '@/core/react';

export interface RatingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RatingDialog({ isOpen, onOpenChange }: RatingDialogProps) {
  const t = useTranslations('support.rating');
  const config = useAppConfigContext();
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === null) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4 gap-5">
          {/* 230 x 380 */}
          <div className="h-20 w-12 md:h-28 md:w-17 mb-4 shrink-0">
            <DotLottieReact
              src={config.support.assets.ratingAnimation}
              loop
              autoplay
            />
          </div>
          {submitted ? (
            <p className="text-center font-bold text-lg animate-bounce">
              {t('thanks')}
            </p>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full shrink">
              <div className="grid grid-cols-5 gap-2 w-full">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    variant={rating === num ? 'default' : 'outline'}
                    className={clsx(
                      'md:h-12 w-full p-0 text-lg font-bold transition-all',
                      rating === num && 'scale-110 ring-2 ring-primary',
                    )}
                    onClick={() => setRating(num)}
                    disabled={num < 4}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between w-full text-xs text-muted-foreground px-1">
                <span>{t('low')}</span>
                <span>{t('high')}</span>
              </div>
            </div>
          )}
        </div>
        {!submitted && (
          <DialogFooter>
            <Button
              disabled={rating === null}
              onClick={handleSubmit}
              className="w-full text-lg md:h-12"
            >
              {t('submit')}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
