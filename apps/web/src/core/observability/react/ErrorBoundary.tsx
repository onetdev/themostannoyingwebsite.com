'use client';

import * as Sentry from '@sentry/nextjs';
import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryFallbackProps {
  error: Error;
  reset: () => void;
}

export type ErrorBoundaryFallback =
  | ReactNode
  | ((props: ErrorBoundaryFallbackProps) => ReactNode);

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ErrorBoundaryFallback;
  name?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { name, onError } = this.props;

    Sentry.captureException(error, {
      extra: {
        boundaryName: name ?? 'unnamed',
        componentStack: errorInfo.componentStack,
      },
    });

    onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback({ error, reset: this.reset });
      }

      if (fallback !== undefined) {
        return fallback;
      }

      return null;
    }

    return children;
  }
}

/**
 * A silent error boundary that logs exceptions to Sentry and renders null.
 * Ideal for non-critical disruptions, background triggers, and decorative overlays.
 */
export function SilentErrorBoundary({
  children,
  name,
}: {
  children?: ReactNode;
  name?: string;
}) {
  return (
    <ErrorBoundary name={name} fallback={null}>
      {children}
    </ErrorBoundary>
  );
}
