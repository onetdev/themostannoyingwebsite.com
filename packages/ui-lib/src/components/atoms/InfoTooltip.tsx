'use client';

import type { PropsWithChildren } from 'react';

import { cn } from '../../utils';
import { Icon, type IconAliaseKey } from './Icon';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

export type InfoTooltipProps = PropsWithChildren<{
  /**
   * Accessible name for the icon trigger. The tooltip itself is only a
   * description, so screen reader users need a real label on the button.
   */
  label: string;
  icon?: IconAliaseKey;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}>;

/**
 * An info icon that reveals help text in a tooltip. The trigger is a real
 * `<button>`, so it stays keyboard reachable and announced.
 */
export function InfoTooltip({
  children,
  className,
  icon = 'info',
  label,
  side = 'top',
}: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={label}
        className={cn(
          'inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50',
          className,
        )}
      >
        <Icon icon={icon} aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent side={side}>{children}</TooltipContent>
    </Tooltip>
  );
}
