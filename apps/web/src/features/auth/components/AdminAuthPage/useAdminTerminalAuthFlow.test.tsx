/**
 * @jest-environment jsdom
 */
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react';
import { StrictMode } from 'react';

import { useAdminTerminal } from './useAdminTerminal';
import { useAdminTerminalAuthFlow } from './useAdminTerminalAuthFlow';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/core/events/event-bus', () => ({
  emit: jest.fn(),
}));

// The boot sequence waits between lines; resolve those waits immediately so the
// test does not depend on wall-clock time. The per-character typing delay still
// uses the terminal's own timer.
jest.mock('@maw/utils/promise', () => ({
  sleep: jest.fn(() => Promise.resolve()),
}));

function Harness({ onEnd }: { onEnd: (authed: boolean) => void }) {
  const term = useAdminTerminal(0);
  useAdminTerminalAuthFlow(term, onEnd);

  return (
    <>
      <div data-testid="lines">
        {term.lines.map((line) => line.text).join('\n')}
      </div>
      <div data-testid="prompt">{term.activePrompt ?? ''}</div>
    </>
  );
}

describe('useAdminTerminalAuthFlow', () => {
  it('keeps the committed boot output when Strict Mode mounts the flow twice', async () => {
    const onEnd = jest.fn();

    const { getByTestId } = render(
      <StrictMode>
        <Harness onEnd={onEnd} />
      </StrictMode>,
    );

    // Wait until the username prompt is active, i.e. the whole boot output has
    // been typed and the input is ready.
    await waitFor(() => {
      expect(getByTestId('prompt').textContent).toBe('loginPrompt ');
    });

    // Regression: two concurrent runs used to abort each other's `printLine`
    // calls, so the already-typed boot lines were never committed and vanished
    // exactly when the prompt appeared.
    const lines = getByTestId('lines').textContent ?? '';
    expect(lines).toContain('systemBoot');
    expect(lines).toContain('systemReady');
    expect(onEnd).not.toHaveBeenCalled();
  });

  it('echoes typed characters into the active prompt', async () => {
    const onEnd = jest.fn();

    const { getByTestId } = render(
      <StrictMode>
        <Harness onEnd={onEnd} />
      </StrictMode>,
    );

    await waitFor(() => {
      expect(getByTestId('prompt').textContent).toBe('loginPrompt ');
    });

    fireEvent.keyDown(window, { key: 'a' });
    fireEvent.keyDown(window, { key: 'd' });

    await waitFor(() => {
      expect(getByTestId('prompt').textContent).toBe('loginPrompt ad');
    });
  });

  it('completes the login flow with typed credentials', async () => {
    const onEnd = jest.fn();

    const { getByTestId } = render(
      <StrictMode>
        <Harness onEnd={onEnd} />
      </StrictMode>,
    );

    await waitFor(() => {
      expect(getByTestId('prompt').textContent).toBe('loginPrompt ');
    });

    for (const key of 'admin') fireEvent.keyDown(window, { key });
    fireEvent.keyDown(window, { key: 'Enter' });

    await waitFor(() => {
      expect(getByTestId('prompt').textContent).toBe('passwordPrompt ');
    });

    for (const key of 'admin') fireEvent.keyDown(window, { key });
    fireEvent.keyDown(window, { key: 'Enter' });

    await waitFor(() => {
      expect(onEnd).toHaveBeenCalledWith(true);
    });
  });
});

describe('useAdminTerminal', () => {
  it('rejects a pending input request when its signal is aborted', async () => {
    const { result } = renderHook(() => useAdminTerminal(0));
    const controller = new AbortController();

    let pending!: Promise<string>;
    act(() => {
      pending = result.current.requestInput(
        { type: 'text', prompt: 'login: ' },
        controller.signal,
      );
    });

    act(() => {
      controller.abort();
    });

    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  });
});
