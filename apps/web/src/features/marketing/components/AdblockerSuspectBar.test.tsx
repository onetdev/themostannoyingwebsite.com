/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AdblockerSuspectBar } from './AdblockerSuspectBar';

let mockAdblockerSuspected: boolean | null = true;
let mockReviewCompleted = true;

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { adblockerSuspected: boolean | null }) => unknown,
  ) => selector({ adblockerSuspected: mockAdblockerSuspected }),
  useUserGrantsStore: (
    selector: (state: { reviewCompleted: boolean }) => unknown,
  ) => selector({ reviewCompleted: mockReviewCompleted }),
}));

describe('AdblockerSuspectBar', () => {
  beforeEach(() => {
    mockAdblockerSuspected = true;
    mockReviewCompleted = true;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.documentElement.style.removeProperty(
      '--adblocker-suspect-bar-height',
    );
    delete (globalThis as { ResizeObserver?: unknown }).ResizeObserver;
  });

  it('renders the close button with an explicit readable foreground color', () => {
    render(<AdblockerSuspectBar />);

    const button = screen.getByRole('button', { name: 'common.action.ok' });
    expect(button).toBeInTheDocument();
    // The bar sets `text-error-foreground` (near-white). The outline button
    // paints `bg-background`, so it must set its own foreground; otherwise the
    // label inherits the near-white color and disappears on the light button.
    expect(button).toHaveClass('text-foreground');
  });

  it('reserves bottom space while the fixed bar is visible', () => {
    const setProperty = jest.spyOn(
      document.documentElement.style,
      'setProperty',
    );

    render(<AdblockerSuspectBar />);

    expect(setProperty).toHaveBeenCalledWith(
      '--adblocker-suspect-bar-height',
      expect.stringContaining('calc('),
    );
  });

  it('keeps the reserved space in sync with the bar size', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    (globalThis as { ResizeObserver?: unknown }).ResizeObserver = jest
      .fn()
      .mockImplementation(() => ({ disconnect, observe }));

    const { unmount } = render(<AdblockerSuspectBar />);

    expect(observe).toHaveBeenCalled();
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('reserves no space when no adblocker is suspected', () => {
    mockAdblockerSuspected = false;
    const setProperty = jest.spyOn(
      document.documentElement.style,
      'setProperty',
    );

    render(<AdblockerSuspectBar />);

    expect(setProperty).not.toHaveBeenCalledWith(
      '--adblocker-suspect-bar-height',
      expect.anything(),
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
