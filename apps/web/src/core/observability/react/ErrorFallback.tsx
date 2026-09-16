'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Link } from '@/core/react';

export type ErrorFallbackSize = 'sm' | 'md' | 'lg' | 'full';

export interface ErrorFallbackProps {
  /**
   * Primary title or headline.
   * Default: localized generic error message
   */
  title?: ReactNode;

  /**
   * Optional explanatory description.
   */
  description?: ReactNode;

  /**
   * Display size variant determining padding, text scale, icon size, and button dimensions.
   * Default: 'md'
   */
  size?: ErrorFallbackSize;

  /**
   * Callback invoked when the retry button is clicked.
   * If not provided, the retry button is omitted.
   */
  onRetry?: () => void;

  /**
   * Custom label for the retry button.
   * Default: localized t('common.action.reset')
   */
  retryLabel?: ReactNode;

  /**
   * Controls display of the "Back to Home" button.
   * Default: true for 'lg' and 'full', false for 'sm' and 'md'
   */
  showHome?: boolean;

  /**
   * Target URL for the home button.
   * Default: '/'
   */
  homeHref?: string;

  /**
   * Custom label for the home button.
   * Default: localized t('common.action.backHome')
   */
  homeLabel?: ReactNode;

  /**
   * Optional custom icon element, or false to hide the icon.
   * Default: alertTriangle icon sized according to the size variant
   */
  icon?: ReactNode | boolean;

  /**
   * Raw error object (used for error digest in production or debug info).
   */
  error?: Error & { digest?: string };

  /**
   * Custom wrapper CSS classes.
   */
  className?: string;
}

const SIZE_CONFIGS: Record<
  ErrorFallbackSize,
  {
    container: string;
    icon: string;
    iconWrapper: string;
    title: string;
    description: string;
    actions: string;
    buttonSize: 'sm' | 'default' | 'lg';
  }
> = {
  sm: {
    container: 'p-4 gap-2',
    icon: 'size-4',
    iconWrapper: 'p-1.5',
    title: 'text-sm font-semibold',
    description: 'text-xs max-w-xs',
    actions: 'mt-2 gap-2',
    buttonSize: 'sm',
  },
  md: {
    container: 'min-h-[35vh] py-10 px-4 gap-3',
    icon: 'size-6',
    iconWrapper: 'p-2.5',
    title: 'text-xl font-bold',
    description: 'text-sm max-w-md',
    actions: 'mt-4 gap-3',
    buttonSize: 'default',
  },
  lg: {
    container: 'min-h-[50vh] py-16 px-4 gap-4',
    icon: 'size-8',
    iconWrapper: 'p-3',
    title: 'text-2xl md:text-3xl font-bold',
    description: 'text-base max-w-lg',
    actions: 'mt-6 gap-4',
    buttonSize: 'default',
  },
  full: {
    container: 'min-h-[70vh] py-20 px-6 gap-5',
    icon: 'size-10',
    iconWrapper: 'p-4',
    title: 'text-3xl md:text-4xl font-extrabold',
    description: 'text-lg max-w-xl',
    actions: 'mt-8 gap-4',
    buttonSize: 'lg',
  },
};

export function ErrorFallback({
  title,
  description,
  size = 'md',
  onRetry,
  retryLabel,
  showHome,
  homeHref = '/',
  homeLabel,
  icon,
  error,
  className,
}: ErrorFallbackProps) {
  const t = useTranslations();
  const config = SIZE_CONFIGS[size];

  const resolvedTitle = title ?? t('common.validation.error.unknownError');
  const resolvedRetryLabel = retryLabel ?? t('common.action.reset');
  const resolvedHomeLabel = homeLabel ?? t('common.action.backHome');
  const shouldShowHome = showHome ?? (size === 'lg' || size === 'full');

  const renderIcon = () => {
    if (icon === false) {
      return null;
    }

    if (icon !== undefined && icon !== true) {
      return icon;
    }

    return (
      <div
        className={`flex items-center justify-center rounded-full bg-destructive/10 text-destructive ${config.iconWrapper} mb-1`}
        data-testid="error-fallback-icon"
      >
        <Icon icon="alertTriangle" className={config.icon} />
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${config.container} ${className ?? ''}`}
      role="alert"
      aria-live="assertive"
    >
      {renderIcon()}

      <h2 className={`${config.title} tracking-tight`}>{resolvedTitle}</h2>

      {description && (
        <p className={`${config.description} text-muted-foreground`}>
          {description}
        </p>
      )}

      {error?.digest && (
        <p className="font-mono text-[10px] text-muted-foreground/60">
          Digest: {error.digest}
        </p>
      )}

      {(onRetry || shouldShowHome) && (
        <div
          className={`flex flex-wrap items-center justify-center ${config.actions}`}
        >
          {onRetry && (
            <Button
              type="button"
              variant="default"
              size={config.buttonSize}
              onClick={onRetry}
            >
              {resolvedRetryLabel}
            </Button>
          )}

          {shouldShowHome && (
            <Button asChild variant="outline" size={config.buttonSize}>
              <Link href={homeHref}>{resolvedHomeLabel}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
