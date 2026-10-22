/**
 * @jest-environment jsdom
 */
import { act, render } from '@testing-library/react';
import { track } from '@/core/telemetry';
import { useImpressionTracking } from './useImpressionTracking';

jest.mock('@/core/i18n/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('@/core/telemetry', () => ({
  track: jest.fn(),
}));

const trackMock = track as unknown as jest.Mock;

type ObserverCallback = IntersectionObserverCallback;

let observerCallback: ObserverCallback | undefined;
const observeMock = jest.fn();
const disconnectMock = jest.fn();

function Harness() {
  useImpressionTracking();
  return (
    <div
      data-track-impression="article:cover"
      data-track-key="hello"
      data-track-section="content:article"
      data-track-index="0"
    />
  );
}

function emitIntersection(target: Element, ratio: number) {
  act(() => {
    observerCallback?.(
      [
        {
          target,
          intersectionRatio: ratio,
          isIntersecting: ratio > 0,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
          rootBounds: null,
          time: 0,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });
}

describe('useImpressionTracking', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    observerCallback = undefined;

    global.IntersectionObserver = jest.fn((callback: ObserverCallback) => {
      observerCallback = callback;
      return {
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: disconnectMock,
        takeRecords: () => [],
        root: null,
        rootMargin: '',
        thresholds: [0.5],
      };
    }) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('observes annotated impression targets', () => {
    render(<Harness />);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('emits once after the dwell threshold', () => {
    const { container } = render(<Harness />);
    const target = container.firstElementChild as Element;

    emitIntersection(target, 0.8);
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(trackMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith('impression.element', {
      key: 'article:cover:hello',
      section: 'content:article',
      index: 0,
      ratio: 0.8,
      visibleMs: 500,
    });

    emitIntersection(target, 0.9);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(trackMock).toHaveBeenCalledTimes(1);
  });

  it('cancels the dwell when the element leaves the viewport', () => {
    const { container } = render(<Harness />);
    const target = container.firstElementChild as Element;

    emitIntersection(target, 0.8);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    emitIntersection(target, 0.1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(trackMock).not.toHaveBeenCalled();
  });
});
