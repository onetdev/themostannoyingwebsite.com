'use client';

import { Button } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

interface ValdoStepProps {
  onNext: () => void;
  rows?: number;
  cols?: number;
}

export function ValdoStep({ onNext, rows = 10, cols = 9 }: ValdoStepProps) {
  const t = useTranslations('subscription.cancellation.valdo');
  const [clicks, setClicks] = useState(0);
  const [clickedButtons, setClickedButtons] = useState<Set<string>>(new Set());
  const solution = `1-${Math.floor(cols / 2)}`;

  const lines = useMemo(() => {
    const data = Array.from({ length: rows }).map((_, lineIdx) => ({
      id: lineIdx,
      offset: lineIdx * 25,
      buttons: Array.from({ length: cols }).map((__, btnIdx) => ({
        id: `${lineIdx}-${btnIdx}`,
        label: t('buttonLabel'),
      })),
    }));

    return data;
  }, [cols, rows, t]);

  const onClick = useCallback(
    (item: { id: string }) => {
      if (item.id === solution) {
        onNext();
      } else {
        setClickedButtons((prev) => {
          const next = new Set(prev);
          next.add(item.id);
          return next;
        });
        setClicks((c) => c + 1);
      }
    },
    [onNext, solution],
  );

  return (
    <div className="relative w-full space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-bold">{t('title')}</h4>
        <p className="text-sm">{t('description')}</p>
      </div>
      <div
        className="flex flex-col gap-1 -mx-8 overflow-x-hidden pb-12"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className="flex gap-2 whitespace-nowrap"
            style={{ marginLeft: `-${line.offset}px` }}
          >
            {line.buttons.map((b) => (
              <Button
                key={b.id}
                type="button"
                variant="outline"
                className={cn(
                  'text-xs transition-opacity duration-500',
                  clickedButtons.has(b.id) && 'opacity-10 pointer-events-none',
                )}
                onClick={() => onClick(b)}
              >
                {b.label}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {clicks > 5 && (
        <div className="animate-bounce font-bold text-sm text-destructive absolute bottom-0">
          {t('error', { amount: `${clicks * 5}.99` })}
        </div>
      )}
    </div>
  );
}
