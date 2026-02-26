'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useAchievementsStore } from '@/stores';

export function ResetAchievementsButton() {
  const t = useTranslations();
  const { achievements, resetAchievements } = useAchievementsStore();
  const [isOpen, setIsOpen] = useState(false);

  const onConfirm = useCallback(() => {
    resetAchievements();
    setIsOpen(false);
  }, [resetAchievements]);

  const hasAnyAchievements = Object.keys(achievements).length > 0;

  if (!hasAnyAchievements) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          {t('achievements.reset.button')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('achievements.reset.confirmTitle')}</DialogTitle>
          <DialogDescription>
            {t('achievements.reset.confirmDescription')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              {t('achievements.reset.cancelAction')}
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            {t('achievements.reset.confirmAction')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
