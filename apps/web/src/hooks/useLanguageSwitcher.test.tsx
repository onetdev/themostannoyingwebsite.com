/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useLanguageSwitcher } from './useLanguageSwitcher';

const mockPush = jest.fn();
const mockPersistLocaleCookie = jest.fn();
const mockTrack = jest.fn();

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

jest.mock('@/core/i18n/locale-cookie', () => ({
  persistLocaleCookie: (locale: string) => mockPersistLocaleCookie(locale),
}));

jest.mock('@/core/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/articles/',
}));

jest.mock('@/core/telemetry', () => ({
  track: (name: string, props: Record<string, unknown>) =>
    mockTrack(name, props),
}));

jest.mock('@/i18n/supported-locales', () => ({
  SUPPORTED_LANGUAGES: [
    { locale: 'en', flag: '🇺🇸', label: 'English' },
    { locale: 'de', flag: '🇩🇪', label: 'Deutsch' },
  ],
}));

describe('useLanguageSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockPersistLocaleCookie.mockClear();
    mockTrack.mockClear();
  });

  it('reports the menu opening with its surface', () => {
    const { result } = renderHook(() =>
      useLanguageSwitcher('navigation:header'),
    );

    act(() => result.current.onOpenChange(true));

    expect(mockTrack).toHaveBeenCalledWith('ui.select-open', {
      control: 'navigation:language',
      section: 'navigation:header',
    });
  });

  it('does not report the menu closing', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    act(() => result.current.onOpenChange(false));

    expect(mockTrack).not.toHaveBeenCalled();
  });

  it('reports a language change and navigates to the selected locale', () => {
    const { result } = renderHook(() =>
      useLanguageSwitcher('navigation:header'),
    );

    act(() => result.current.onLanguageChange('de'));

    expect(mockTrack).toHaveBeenCalledWith('nav.locale-change', {
      locale: 'de',
      from: 'en',
      section: 'navigation:header',
    });
    expect(mockPersistLocaleCookie).toHaveBeenCalledWith('de');
    expect(mockPush).toHaveBeenCalledWith('/articles/', { locale: 'de' });
  });

  it('does not report re-selecting the current locale', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    act(() => result.current.onLanguageChange('en'));

    expect(mockTrack).not.toHaveBeenCalled();
    expect(mockPersistLocaleCookie).toHaveBeenCalledWith('en');
  });

  it('ignores an empty selection', () => {
    const { result } = renderHook(() => useLanguageSwitcher());

    act(() => result.current.onLanguageChange(null));

    expect(mockTrack).not.toHaveBeenCalled();
    expect(mockPersistLocaleCookie).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
