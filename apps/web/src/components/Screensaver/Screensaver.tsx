'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { BouncingLogoScreensaver } from './BouncingLogoScreensaver';
import { MazeScreensaver } from './MazeScreensaver';

import { usePainPreferencesStore, useRuntimeStore } from '@/kernel';

export function Screensaver() {
  const isEnabled = usePainPreferencesStore((state) => state.flags.screensaver);
  const { variant, timeoutSeconds } = usePainPreferencesStore(
    (state) => state.screensaver,
  );
  const lastEventAt = useRuntimeStore(
    (state) => state.userActivation.lastEventAt,
  );
  const isTouch = useRuntimeStore((state) => state.isTouch);
  const t = useTranslations();
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (!isEnabled || lastEventAt === null) {
      setActive(false);
      return;
    }

    const diff = Date.now() - lastEventAt;
    const timeoutMs = timeoutSeconds * 1000;

    if (diff >= timeoutMs) {
      setActive(true);
      return;
    }

    setActive(false);
    const timer = setTimeout(() => setActive(true), timeoutMs - diff);
    return () => clearTimeout(timer);
  }, [lastEventAt, timeoutSeconds, isEnabled]);

  return (
    <AnimatePresence>
      {isActive && isEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-1000 cursor-none overflow-hidden bg-black">
          {variant === 'maze' ? (
            <MazeScreensaver />
          ) : (
            <BouncingLogoScreensaver />
          )}

          <div className="absolute bottom-10 left-0 z-1010 w-full text-center">
            <span className="pointer-events-none text-xs tracking-widest text-white/50 uppercase select-none">
              {isTouch
                ? t('settings.screensaver.exitTap')
                : t('settings.screensaver.exitClick')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
