import type { JSX, PropsWithoutRef } from 'react';

declare global {
  type JSXProxyProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
    JSX.IntrinsicElements[T]
  >;

  type AppTheme = 'light' | 'dark';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type TypeNarrowArg = any;

  type CaptchaFormInputs = {
    captcha: string;
  };
}
