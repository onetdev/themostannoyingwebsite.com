import type { JSX, PropsWithoutRef } from 'react';

declare global {
  type JSXProxyProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
    JSX.IntrinsicElements[T]
  >;

  type AppTheme = 'light' | 'dark';
}
