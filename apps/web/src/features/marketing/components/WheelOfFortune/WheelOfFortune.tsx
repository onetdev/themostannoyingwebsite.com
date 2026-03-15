'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FadeIn,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useEvent } from '@/hooks';
import { ModalContent } from './ModalContent';
import { WheelOfFortuneTrigger } from './WheelOfFortuneTrigger';

export function WheelOfFortune() {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations();

  useEvent('ui:modal:dismiss-signaled', () => setOpen(false), isOpen);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent showCloseButton={true} className="overflow-hidden p-0">
          <DialogHeader className="p-5 pb-2">
            <DialogTitle>{t('marketing.wheelOfFortune.title')}</DialogTitle>
          </DialogHeader>
          <ModalContent className="max-h-[600px] max-w-[600px] grow" />
        </DialogContent>
      </Dialog>
      <FadeIn className="fixed top-1/2 ltr:left-0 z-30 rtl:right-0 rtl:-scale-x-100">
        <WheelOfFortuneTrigger onClick={() => setOpen(true)} />
      </FadeIn>
    </>
  );
}
