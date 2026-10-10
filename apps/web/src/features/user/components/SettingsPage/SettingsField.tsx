'use client';

import { Field, FieldLabel, FieldTitle, InfoTooltip } from '@maw/ui-lib';
import { cn } from '@maw/ui-lib/utils';
import { useTranslations } from 'next-intl';
import { type ReactNode, useId } from 'react';

export type SettingsFieldProps = {
  label: string;
  /** Help text revealed by the info tooltip. */
  info?: string;
  /** Static value variant; renders a title/value row with no control. */
  value?: ReactNode;
  /** Mirrors the control's disabled state for label styling. */
  disabled?: boolean;
  className?: string;
  /** Control variant; receives the id to wire to the control. */
  children?: (id: string) => ReactNode;
};

export function SettingsField({
  children,
  className,
  disabled = false,
  info,
  label,
  value,
}: SettingsFieldProps) {
  const t = useTranslations();
  const id = useId();

  if (children === undefined) {
    return (
      <Field
        orientation="horizontal"
        className={cn('justify-between gap-3', className)}
      >
        <FieldTitle>{label}</FieldTitle>
        <span className="text-muted-foreground">{value}</span>
      </Field>
    );
  }

  return (
    <Field
      orientation="horizontal"
      data-disabled={disabled || undefined}
      className={cn('w-fit max-w-full gap-3', className)}
    >
      {children(id)}
      <FieldLabel htmlFor={id} className="font-normal">
        {label}
      </FieldLabel>
      {info && (
        <InfoTooltip label={t('common.action.moreInformation')}>
          {info}
        </InfoTooltip>
      )}
    </Field>
  );
}
