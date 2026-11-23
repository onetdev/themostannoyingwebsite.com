/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { useRef } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

let observerCallback: IntersectionObserverCallback | undefined;

class MockIntersectionObserver {
  public static observe = jest.fn();
  public static disconnect = jest.fn();

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }

  public observe = MockIntersectionObserver.observe;
  public disconnect = MockIntersectionObserver.disconnect;
  public unobserve = jest.fn();
  public takeRecords = jest.fn(() => []);
}

const triggerIntersection = (isIntersecting: boolean) => {
  observerCallback?.(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
};

describe('useIntersectionObserver', () => {
  const originalIntersectionObserver = global.IntersectionObserver;

  beforeEach(() => {
    observerCallback = undefined;
    MockIntersectionObserver.observe.mockClear();
    MockIntersectionObserver.disconnect.mockClear();
    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('observes the referenced element', () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));

      useIntersectionObserver({ $ref: ref, onIntersect: jest.fn() });

      return ref;
    });

    expect(MockIntersectionObserver.observe).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
    );
  });

  it('forwards intersection entries to the handler', () => {
    const onIntersect = jest.fn();

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));

      useIntersectionObserver({ $ref: ref, onIntersect });
    });

    act(() => triggerIntersection(true));

    expect(onIntersect).toHaveBeenCalledWith(
      expect.objectContaining({ isIntersecting: true }),
    );
  });

  it('uses the latest handler without resubscribing', () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    const { rerender } = renderHook(
      ({ onIntersect }: { onIntersect: jest.Mock }) => {
        const ref = useRef<HTMLDivElement>(document.createElement('div'));

        useIntersectionObserver({ $ref: ref, onIntersect });
      },
      { initialProps: { onIntersect: firstHandler } },
    );

    rerender({ onIntersect: secondHandler });
    act(() => triggerIntersection(false));

    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.observe).toHaveBeenCalledTimes(1);
  });

  it('disconnects on unmount', () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'));

      useIntersectionObserver({ $ref: ref, onIntersect: jest.fn() });
    });

    unmount();

    expect(MockIntersectionObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when IntersectionObserver is unavailable', () => {
    global.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver;

    expect(() =>
      renderHook(() => {
        const ref = useRef<HTMLDivElement>(document.createElement('div'));

        useIntersectionObserver({ $ref: ref, onIntersect: jest.fn() });
      }),
    ).not.toThrow();
  });
});
