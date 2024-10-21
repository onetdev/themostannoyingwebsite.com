import type { JSX, PropsWithoutRef } from 'react';

export const DOCUMENT_EVENT_SEARCH = 'DocumentEventSearch';
export type DocumentEventSearchDetails = {
  query: string;
};

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

  interface DocumentEventMap {
    [DOCUMENT_EVENT_SEARCH]: CustomEvent<DocumentEventSearchDetails>;
  }
}
