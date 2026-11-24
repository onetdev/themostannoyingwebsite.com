'use client';

import {
  Button,
  type ButtonProps,
  Icon,
  type IconAliaseKey,
} from '@maw/ui-lib';
import { cn } from 'cn';

import {
  WHITE_CONTROL_CLASS,
  WHITE_CONTROL_ICON_CLASS,
} from './short-player-controls';

export interface ShortPlayerIconButtonProps
  extends Omit<ButtonProps, 'children'> {
  icon: IconAliaseKey;
  iconClassName?: string;
}

/**
 * Icon-only player control with the shared white chrome.
 *
 * Consumers must pass an `aria-label`: the button renders no visible text.
 */
export function ShortPlayerIconButton({
  icon,
  iconClassName,
  className,
  ...props
}: ShortPlayerIconButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      className={cn(WHITE_CONTROL_CLASS, className)}
      {...props}
    >
      <Icon
        icon={icon}
        className={cn(WHITE_CONTROL_ICON_CLASS, iconClassName)}
        aria-hidden
      />
    </Button>
  );
}
