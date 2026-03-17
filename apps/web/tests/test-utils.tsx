import {
  type RenderHookOptions,
  type RenderOptions,
  type RenderResult,
  render,
  renderHook,
} from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren, ReactElement } from 'react';

import en from '@/i18n/messages/en';

const defaultMessages = en;

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: typeof defaultMessages;
}

interface CustomRenderHookOptions<TProps>
  extends Omit<RenderHookOptions<TProps>, 'wrapper'> {
  locale?: string;
  messages?: typeof defaultMessages;
}

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    locale = 'en',
    messages = defaultMessages,
    ...renderOptions
  }: CustomRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <NextIntlClientProvider locale={locale as AppLocale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Custom renderHook function that wraps hooks with necessary providers
 */
export function renderHookWithProviders<TResult, TProps>(
  renderCallback: (initialProps: TProps) => TResult,
  {
    locale = 'en',
    messages = defaultMessages,
    ...renderOptions
  }: CustomRenderHookOptions<TProps> = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <NextIntlClientProvider locale={locale as AppLocale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return renderHook(renderCallback, { wrapper: Wrapper, ...renderOptions });
}
