/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { toast } from '@maw/ui-lib';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { LocaleSuggestion } from './LocaleSuggestion';

const mockOnAccept = jest.fn();
const mockOnDismiss = jest.fn();

jest.mock('@/hooks', () => ({
  useLocaleSuggestion: () => ({
    isReady: true,
    suggestedLocale: 'hu',
    content: {
      changeAction: 'Váltás Magyarra',
      stayAction: 'Maradok angolul',
      message: 'Magyarul olvasnád?',
    },
    onAccept: mockOnAccept,
    onDismiss: mockOnDismiss,
  }),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@maw/ui-lib', () => ({
  ...jest.requireActual('@maw/ui-lib'),
  toast: { custom: jest.fn(), dismiss: jest.fn() },
}));

const toastMock = toast as unknown as {
  custom: jest.Mock;
  dismiss: jest.Mock;
};

type ToastContent = (id: string | number) => ReactNode;

function renderShownToast() {
  const content = toastMock.custom.mock.calls[0]?.[0] as
    | ToastContent
    | undefined;

  if (!content) {
    throw new Error('Expected toast.custom to receive the suggestion content');
  }

  return render(content('toast-1'));
}

describe('LocaleSuggestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the suggestion inside the standard toast card', () => {
    render(<LocaleSuggestion />);
    const { container } = renderShownToast();

    expect(screen.getByText('Magyarul olvasnád?')).toHaveClass('text-sm');
    expect(
      screen.getByRole('button', { name: 'Váltás Magyarra' }),
    ).toBeVisible();
    expect(container.firstElementChild).toHaveClass('toast-card');
  });

  it('accepts the suggested locale and dismisses the toast', () => {
    render(<LocaleSuggestion />);
    renderShownToast();

    screen.getByRole('button', { name: 'Váltás Magyarra' }).click();

    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(mockOnDismiss).not.toHaveBeenCalled();
    expect(toastMock.dismiss).toHaveBeenCalledWith('toast-1');
  });

  it('persists a dismissal before closing the toast', () => {
    render(<LocaleSuggestion />);
    renderShownToast();

    screen.getByRole('button', { name: 'common.action.close' }).click();

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    expect(mockOnAccept).not.toHaveBeenCalled();
    expect(toastMock.dismiss).toHaveBeenCalledWith('toast-1');
  });
});
