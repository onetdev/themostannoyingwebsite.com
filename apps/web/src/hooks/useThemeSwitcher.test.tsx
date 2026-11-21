/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';

import { useThemeSwitcher } from './useThemeSwitcher';

const mockSetTheme = jest.fn();
const mockTrack = jest.fn();
let mockTheme: string | undefined = 'dark';

jest.mock(
  '@wrksz/themes/client',
  () => ({
    useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
  }),
  // The package only ships an `import` export condition, which Jest's CJS
  // resolver cannot match; the mock is virtual so no disk module is required.
  { virtual: true },
);

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/core/telemetry', () => ({
  track: (name: string, props: Record<string, unknown>) =>
    mockTrack(name, props),
}));

describe('useThemeSwitcher', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockTrack.mockClear();
    mockTheme = 'dark';
  });

  it('exposes the raw selection, including system', () => {
    const { result } = renderHook(() => useThemeSwitcher());

    expect(result.current.value).toBe('dark');

    mockTheme = 'system';
    const { result: systemResult } = renderHook(() => useThemeSwitcher());

    expect(systemResult.current.value).toBe('system');
  });

  it('falls back to system before hydration', () => {
    mockTheme = undefined;

    const { result } = renderHook(() => useThemeSwitcher());

    expect(result.current.value).toBe('system');
  });

  it('persists the selected preference', () => {
    const { result } = renderHook(() => useThemeSwitcher());

    act(() => result.current.onValueChange('light'));

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('reports the menu opening with its surface', () => {
    const { result } = renderHook(() =>
      useThemeSwitcher('settings:preferences'),
    );

    act(() => result.current.onOpenChange(true));

    expect(mockTrack).toHaveBeenCalledWith('ui.select-open', {
      control: 'navigation:theme',
      section: 'settings:preferences',
    });
  });

  it('does not report the menu closing', () => {
    const { result } = renderHook(() => useThemeSwitcher());

    act(() => result.current.onOpenChange(false));

    expect(mockTrack).not.toHaveBeenCalled();
  });
});
