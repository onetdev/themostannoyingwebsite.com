'use client';

import {
  Button,
  type ButtonProps,
  Icon,
  type IconAliaseKey,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@maw/ui-lib';
import { cn } from 'cn';

import {
  WHITE_CONTROL_CLASS,
  WHITE_CONTROL_ICON_CLASS,
} from './short-player-controls';

export interface ShortPlayerActionButtonProps
  extends Omit<ButtonProps, 'children'> {
  icon: IconAliaseKey;
  /** Accessible name for the icon-only button. */
  label: string;
  /** Text shown in the hover/focus tooltip. */
  tooltip: string;
  iconClassName?: string;
}

/**
 * Circular icon action with a shadcn tooltip.
 *
 * The tooltip trigger renders as the shared `Button`, so keyboard focus and the
 * accessible label still target the real control.
 */
export function ShortPlayerActionButton({
  icon,
  label,
  tooltip,
  iconClassName,
  className,
  ...props
}: ShortPlayerActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className={cn(WHITE_CONTROL_CLASS, className)}
            aria-label={label}
            {...props}
          />
        }
      >
        <Icon
          icon={icon}
          className={cn(WHITE_CONTROL_ICON_CLASS, iconClassName)}
          aria-hidden
        />
      </TooltipTrigger>
      <TooltipContent side="left">{tooltip}</TooltipContent>
    </Tooltip>
  );
}
