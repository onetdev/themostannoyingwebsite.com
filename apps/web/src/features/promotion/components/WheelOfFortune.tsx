'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ModalContent } from './WheelOfFortune/ModalContent';

export function WheelOfFortune() {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent showCloseButton={true} className="overflow-hidden p-0">
          <DialogHeader className="p-5 pb-2">
            <DialogTitle>{t('wheelOfFortune.title')}</DialogTitle>
          </DialogHeader>
          <ModalContent className="max-h-[600px] max-w-[600px] grow" />
        </DialogContent>
      </Dialog>
      <div className="fixed top-1/2 left-0 z-30">
        <button
          className="animate-wiggle-8deg bg-error text-on-error -ml-8 cursor-pointer py-3 pr-6 pl-10 text-2xl opacity-80 transition-all duration-200 ease-in-out hover:-ml-4 hover:opacity-100"
          onClick={() => setOpen(true)}
          aria-label={t('wheelOfFortune.title')}>
          <Icon icon="tags" />
        </button>
      </div>
    </>
  );
}
