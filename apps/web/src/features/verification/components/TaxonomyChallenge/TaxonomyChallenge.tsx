'use client';

import { useAppConfigContext } from '@/core/config/react-app-config';
import { TaxonomySelectorSelect } from './TaxonomySelector';

interface TaxonomyChallengeProps {
  className?: string;
  onResolved?: () => void;
}

export function TaxonomyChallenge({
  className,
  onResolved,
}: TaxonomyChallengeProps) {
  const {
    verification: { assets },
  } = useAppConfigContext();

  const onCountChange = (count: number) => {
    if (count === 9) {
      onResolved?.();
    }
  };

  return (
    <div className={`w-full max-w-[350px] ${className}`}>
      <div className="bg-primary text-primary-foreground mb-2 p-4">
        <div className="opacity-90">
          Select all squares with{' '}
          <span className="font-bold leading-tight">pamparam</span>
        </div>
        <div className="mt-1 text-xs opacity-75">
          If there are none, click skip
        </div>
      </div>

      <TaxonomySelectorSelect
        onSelectionChange={onCountChange}
        sprites={assets.taxonomyChallengeSprites}
      />
    </div>
  );
}
