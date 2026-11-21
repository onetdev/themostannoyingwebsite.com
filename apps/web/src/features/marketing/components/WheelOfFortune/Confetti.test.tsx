/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import confetti from 'canvas-confetti';
import { Confetti } from './Confetti';

jest.mock('canvas-confetti', () => {
  const fire = jest.fn();
  const reset = jest.fn();

  return {
    __esModule: true,
    default: {
      create: jest.fn(() => Object.assign(fire, { reset })),
    },
  };
});

type ConfettiInstance = jest.Mock & { reset: jest.Mock };

const createMock = confetti.create as unknown as jest.Mock;

function fireMock(): ConfettiInstance {
  return createMock.mock.results[0]?.value as ConfettiInstance;
}

const NOW = new Date('2026-10-20T12:00:00.000Z');

describe('Confetti', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('fires a full spread explosion from the center', () => {
    render(<Confetti />);

    expect(fireMock()).toHaveBeenCalledWith(
      expect.objectContaining({
        origin: { x: 0.5, y: 0.5 },
        spread: 360,
      }),
    );
  });

  it('stretches the canvas over the whole container', () => {
    const { container } = render(<Confetti />);

    expect(container.querySelector('canvas')).toHaveClass(
      'absolute',
      'inset-0',
      'size-full',
      'pointer-events-none',
    );
  });

  it('keeps raining confetti from above the top edge', () => {
    render(<Confetti />);

    act(() => {
      jest.advanceTimersByTime(120);
    });

    const rainCalls = fireMock().mock.calls.filter(
      ([options]) => options?.origin?.y < 0,
    );

    expect(rainCalls.length).toBeGreaterThan(0);
    expect(rainCalls[0]?.[0]).toEqual(
      expect.objectContaining({
        angle: 270,
        gravity: 1,
        particleCount: 6,
      }),
    );
  });

  it('keeps raining until unmounted', () => {
    const { unmount } = render(<Confetti />);
    const fire = fireMock();

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    const callsWhileMounted = fire.mock.calls.length;
    expect(callsWhileMounted).toBeGreaterThan(1);

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    expect(fire.mock.calls.length).toBeGreaterThan(callsWhileMounted);

    unmount();

    const callsBeforeUnmount = fire.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    expect(fire.mock.calls.length).toBe(callsBeforeUnmount);
    expect(fire.reset).toHaveBeenCalled();
  });
});
