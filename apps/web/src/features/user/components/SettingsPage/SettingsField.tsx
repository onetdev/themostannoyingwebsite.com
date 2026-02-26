import {
  Field,
  FieldLabel,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import type { PropsWithChildren } from 'react';

export type SettingsFieldProps = PropsWithChildren<{
  info?: string;
  label: string;
  reverse?: boolean;
}>;

export function SettingsField({
  children,
  info,
  label,
  reverse = false,
}: SettingsFieldProps) {
  return (
    <Field
      orientation="horizontal"
      className={cn(reverse && 'flex-row-reverse justify-between', 'gap-3')}
    >
      {children}
      <FieldLabel className="flex items-center gap-2">
        {label}
        {info && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icon icon="info" className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>{info}</TooltipContent>
          </Tooltip>
        )}
      </FieldLabel>
    </Field>
  );
}
