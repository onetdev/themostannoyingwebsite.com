/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ShareButton } from './ShareButton';

const showShareModal = jest.fn();

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/stores', () => ({
  useRuntimeStore: (
    selector: (state: { showShareModal: typeof showShareModal }) => unknown,
  ) => selector({ showShareModal }),
}));

const setNativeShare = (value: unknown) => {
  Object.defineProperty(navigator, 'share', {
    value,
    configurable: true,
    writable: true,
  });
};

describe('ShareButton', () => {
  beforeEach(() => {
    showShareModal.mockClear();
    setNativeShare(undefined);
  });

  afterEach(() => {
    setNativeShare(undefined);
    jest.restoreAllMocks();
  });

  it('renders an accessible share button', () => {
    render(<ShareButton />);

    expect(
      screen.getByRole('button', { name: 'common.action.share' }),
    ).toBeInTheDocument();
  });

  it('uses the native share sheet when available', async () => {
    const share = jest.fn().mockResolvedValue(undefined);
    setNativeShare(share);

    render(<ShareButton url="https://example.com/article" title="Hello" />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(share).toHaveBeenCalledWith({
        title: 'Hello',
        url: 'https://example.com/article',
      }),
    );
    expect(showShareModal).not.toHaveBeenCalled();
  });

  it('falls back to the modal when the native share sheet is unavailable', () => {
    render(<ShareButton url="https://example.com/article" />);
    fireEvent.click(screen.getByRole('button'));

    expect(showShareModal).toHaveBeenCalledWith('https://example.com/article');
  });

  it('does not open the modal when the user dismisses the native sheet', async () => {
    const abort = new DOMException('Aborted', 'AbortError');
    const share = jest.fn().mockRejectedValue(abort);
    setNativeShare(share);

    render(<ShareButton />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(share).toHaveBeenCalled());
    expect(showShareModal).not.toHaveBeenCalled();
  });

  it('falls back to the modal when the native share sheet fails', async () => {
    const share = jest.fn().mockRejectedValue(new Error('nope'));
    setNativeShare(share);

    render(<ShareButton />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(showShareModal).toHaveBeenCalled());
  });
});
