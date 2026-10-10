'use client';

import { Button, FadeIn } from '@maw/ui-lib';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useRuntimeStore, useUserGrantsStore } from '@/stores';

/**
 * Height (including the floating gap) reserved at the bottom of the page shell
 * while the bar is visible, so the fixed bar never covers the footer.
 */
const BAR_HEIGHT_VAR = '--adblocker-suspect-bar-height';

export function AdblockerSuspectBar() {
  const t = useTranslations();
  const [isOpen, setOpen] = useState(true);
  const suspected = useRuntimeStore((state) => state.adblockerSuspected);
  const ppReviewed = useUserGrantsStore((state) => state.reviewCompleted);
  const barRef = useRef<HTMLDivElement>(null);

  const show = ppReviewed && suspected === true && isOpen;

  useEffect(() => {
    const root = document.documentElement;

    if (!show || !barRef.current) {
      root.style.removeProperty(BAR_HEIGHT_VAR);
      return;
    }

    const element = barRef.current;
    const sync = () => {
      root.style.setProperty(
        BAR_HEIGHT_VAR,
        `calc(${element.offsetHeight}px + 0.75rem)`,
      );
    };

    sync();

    if (typeof ResizeObserver === 'undefined') {
      return () => root.style.removeProperty(BAR_HEIGHT_VAR);
    }

    const observer = new ResizeObserver(sync);
    observer.observe(element);

    return () => {
      observer.disconnect();
      root.style.removeProperty(BAR_HEIGHT_VAR);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <FadeIn
          y={20}
          className="pointer-events-none fixed inset-x-0 bottom-3 z-30 px-3"
          key="adblocker-suspect-bar"
        >
          <div
            ref={barRef}
            className="border-tertiary bg-error/90 text-error-foreground container pointer-events-auto mx-auto rounded-xl border px-gutter py-3 shadow-lg backdrop-blur-md"
          >
            <h4>{t('marketing.suspectBar.title')}</h4>
            <p>{t('marketing.suspectBar.description')}</p>
            <div className="my-2 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t('common.action.ok')}
              </Button>
            </div>
          </div>
        </FadeIn>
      )}
    </AnimatePresence>
  );
}
