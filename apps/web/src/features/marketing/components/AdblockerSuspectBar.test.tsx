/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AdblockerSuspectBar } from './AdblockerSuspectBar';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { adblockerSuspected: boolean | null }) => unknown,
  ) => selector({ adblockerSuspected: true }),
  useUserGrantsStore: (
    selector: (state: { reviewCompleted: boolean }) => unknown,
  ) => selector({ reviewCompleted: true }),
}));

describe('AdblockerSuspectBar', () => {
  it('renders the close button with an explicit readable foreground color', () => {
    render(<AdblockerSuspectBar />);

    const button = screen.getByRole('button', { name: 'common.action.ok' });
    expect(button).toBeInTheDocument();
    // The bar sets `text-error-foreground` (near-white). The outline button
    // paints `bg-background`, so it must set its own foreground; otherwise the
    // label inherits the near-white color and disappears on the light button.
    expect(button).toHaveClass('text-foreground');
  });
});
