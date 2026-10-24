import { cn } from 'cn';
import type { ComponentProps } from 'react';

import { Icon, type IconAliaseKey } from '../Icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

export const THEME_SELECT_VALUES = ['system', 'light', 'dark'] as const;

export type ThemeSelectValue = (typeof THEME_SELECT_VALUES)[number];

const themeIcons: Record<ThemeSelectValue, IconAliaseKey> = {
  system: 'system',
  light: 'sun',
  dark: 'moon',
};

/** Static glyph shown in the trigger, regardless of the current preference. */
const TRIGGER_ICON: IconAliaseKey = 'theme';

export type ThemeSelectProps = {
  className?: string;
  /** Show only the static theme icon (plus the dropdown chevron) in the trigger. */
  displayOnlyIcon?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange: (theme: ThemeSelectValue) => void;
  text: Record<ThemeSelectValue, string> & {
    /** Accessible name of the trigger, e.g. "Theme". */
    label: string;
  };
  value: ThemeSelectValue;
} & Omit<
  ComponentProps<typeof SelectContent>,
  'align' | 'children' | 'className'
>;

/**
 * Renders a three-state theme selector. Props other than the trigger's are
 * forwarded to the portaled popup, e.g. the `data-track-*` telemetry attributes.
 */
export function ThemeSelect({
  className,
  displayOnlyIcon = false,
  onOpenChange,
  onValueChange,
  text,
  value,
  ...popupProps
}: ThemeSelectProps) {
  // The trigger's visible content is only an icon in the header, so the
  // accessible name carries both the control label and the active preference.
  const accessibleLabel = `${text.label}: ${text[value]}`;

  const onSelect = (nextTheme: ThemeSelectValue | null) => {
    if (nextTheme !== null) {
      onValueChange(nextTheme);
    }
  };

  return (
    <Select value={value} onValueChange={onSelect} onOpenChange={onOpenChange}>
      <SelectTrigger
        aria-label={accessibleLabel}
        title={text.label}
        data-testid="theme-select"
        className={cn(
          displayOnlyIcon && 'h-9 justify-center rounded-full px-2',
          className,
        )}
      >
        <SelectValue>
          <Icon icon={TRIGGER_ICON} />
          {!displayOnlyIcon && text[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        className="w-auto min-w-(--anchor-width) whitespace-nowrap"
        {...popupProps}
      >
        {THEME_SELECT_VALUES.map((theme) => (
          <SelectItem key={theme} value={theme}>
            <span className="flex items-center gap-2">
              <Icon
                icon={themeIcons[theme]}
                className="text-muted-foreground"
              />
              {text[theme]}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
