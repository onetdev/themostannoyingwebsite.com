/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { emit } from '@/core/events/event-bus';
import { useAppConfigContext } from '@/core/react';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import { PossessedCursor } from './PossessedCursor';

jest.mock('motion/react', () => {
  const React = jest.requireActual('react') as typeof import('react');

  type MotionMockProps = Record<string, unknown> & {
    children?: React.ReactNode;
  };

  const stripMotionProps = ({
    initial,
    animate,
    exit,
    transition,
    children,
    ...props
  }: MotionMockProps) => {
    void initial;
    void animate;
    void exit;
    void transition;

    return { children, props };
  };

  const MockMotionImage = React.forwardRef<HTMLImageElement, MotionMockProps>(
    (props, ref) => {
      const { props: rest } = stripMotionProps(props);
      return React.createElement('img', { ...rest, ref, alt: '' });
    },
  );
  MockMotionImage.displayName = 'MockMotionImage';

  const MockMotionDiv = (props: MotionMockProps) =>
    React.createElement('div', stripMotionProps(props).props);
  MockMotionDiv.displayName = 'MockMotionDiv';

  const MockMotionSpan = (props: MotionMockProps) =>
    React.createElement('span', stripMotionProps(props).props);
  MockMotionSpan.displayName = 'MockMotionSpan';

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      img: MockMotionImage,
      div: MockMotionDiv,
      span: MockMotionSpan,
    },
  };
});

jest.mock('@/core/events/event-bus', () => ({
  emit: jest.fn(),
}));

jest.mock('@/core/react', () => ({
  useAppConfigContext: jest.fn(),
}));

jest.mock('@/stores', () => ({
  usePainPreferencesStore: jest.fn(),
  useRuntimeStore: jest.fn(),
}));

const CURSORS = [
  {
    id: 'arrow-a',
    src: '/assets/cursors/arrow-a.svg',
    hotspot: { x: 1, y: 1 },
    kind: 'arrow',
  },
  {
    id: 'arrow-b',
    src: '/assets/cursors/arrow-b.svg',
    hotspot: { x: 1, y: 1 },
    kind: 'arrow',
  },
  {
    id: 'busy',
    src: '/assets/cursors/busy.svg',
    hotspot: { x: 16, y: 16 },
    kind: 'busy',
  },
] as const;

const mockConfig = {
  disruptions: {
    possessedCursor: {
      cursors: CURSORS,
      firstSwapDelaySeconds: { min: 1, max: 1 },
      swapDelaySeconds: { min: 1, max: 1 },
      ghostLifetimeSeconds: { min: 10, max: 10 },
      maxGhosts: 3,
      ghostPathSteps: { min: 2, max: 2 },
    },
  },
};

const mockStores = ({
  isEnabled = true,
  isTouch = false,
}: {
  isEnabled?: boolean;
  isTouch?: boolean;
}) => {
  (usePainPreferencesStore as unknown as jest.Mock).mockImplementation(
    (selector: (state: unknown) => unknown) =>
      selector({ flags: { possessedCursor: isEnabled } }),
  );
  (useRuntimeStore as unknown as jest.Mock).mockImplementation(
    (selector: (state: unknown) => unknown) =>
      selector({ isTouch, document: { isVisible: true } }),
  );
};

const advance = (milliseconds: number) => {
  act(() => {
    jest.advanceTimersByTime(milliseconds);
  });
};

describe('PossessedCursor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Math, 'random').mockReturnValue(0);
    (useAppConfigContext as jest.Mock).mockReturnValue(mockConfig);
    mockStores({});
    (emit as jest.Mock).mockClear();
    document.documentElement.removeAttribute('data-possessed-cursor');
    document.documentElement.style.removeProperty('--possessed-cursor');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('applies the custom cursor globally when enabled', () => {
    render(<PossessedCursor />);

    expect(document.documentElement.dataset.possessedCursor).toBe('true');
    expect(
      document.documentElement.style.getPropertyValue('--possessed-cursor'),
    ).toBe('url("/assets/cursors/arrow-a.svg") 1 1, default');
  });

  it('swaps the cursor and detaches the previous one as a ghost', () => {
    render(<PossessedCursor />);

    advance(1001);

    expect(
      document.documentElement.style.getPropertyValue('--possessed-cursor'),
    ).toBe('url("/assets/cursors/arrow-b.svg") 1 1, default');

    const ghost = screen.getByTestId('possessed-ghost-cursor');
    expect(ghost).toHaveAttribute('src', '/assets/cursors/arrow-a.svg');
    expect(ghost).toHaveAttribute('data-cursor-id', 'arrow-a');
  });

  it('keeps at most three ghosts alive', () => {
    render(<PossessedCursor />);

    advance(1001);
    advance(1001);
    advance(1001);
    advance(1001);

    expect(screen.getAllByTestId('possessed-ghost-cursor')).toHaveLength(3);
  });

  it('catches the ghost and stops the pointer event from propagating', () => {
    render(<PossessedCursor />);
    advance(1001);

    const ghost = screen.getByTestId('possessed-ghost-cursor');
    jest.spyOn(ghost, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 10,
      left: 10,
      top: 10,
      right: 42,
      bottom: 42,
      width: 32,
      height: 32,
      toJSON: () => ({}),
    });

    const documentPointerDown = jest.fn();
    document.addEventListener('pointerdown', documentPointerDown);
    const pointerDown = new MouseEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 20,
      clientY: 20,
    });
    fireEvent(ghost, pointerDown);
    document.removeEventListener('pointerdown', documentPointerDown);

    expect(pointerDown.defaultPrevented).toBe(true);
    expect(documentPointerDown).not.toHaveBeenCalled();
    expect(emit).toHaveBeenCalledWith('possessed-cursor:caught', {
      cursorId: 'arrow-a',
    });
    const puff = screen.getByTestId('possessed-cursor-puff');
    expect(puff).toBeInTheDocument();
    expect(puff).toHaveAttribute('data-puff-frame', '0');
    expect(screen.queryByTestId('possessed-ghost-cursor')).toBeNull();
  });

  it('advances through the SVG puff sequence and then removes it', () => {
    render(<PossessedCursor />);
    advance(1001);

    const ghost = screen.getByTestId('possessed-ghost-cursor');
    jest.spyOn(ghost, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 10,
      left: 10,
      top: 10,
      right: 42,
      bottom: 42,
      width: 32,
      height: 32,
      toJSON: () => ({}),
    });

    fireEvent(
      ghost,
      new MouseEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 20,
      }),
    );

    const puff = screen.getByTestId('possessed-cursor-puff');
    expect(puff).toHaveAttribute('data-puff-frame', '0');

    advance(75);

    const frame = Number(puff.getAttribute('data-puff-frame'));
    expect(frame).toBeGreaterThan(0);
    expect(frame).toBeLessThan(7);

    advance(626);

    expect(screen.queryByTestId('possessed-cursor-puff')).toBeNull();
  });

  it('spawns ghosts on touch devices without a CSS cursor', () => {
    mockStores({ isTouch: true });
    render(<PossessedCursor />);

    expect(document.documentElement.dataset.possessedCursor).toBeUndefined();

    advance(1001);

    expect(screen.getByTestId('possessed-ghost-cursor')).toBeInTheDocument();
  });

  it('does nothing when disabled', () => {
    mockStores({ isEnabled: false });
    render(<PossessedCursor />);

    expect(document.documentElement.dataset.possessedCursor).toBeUndefined();

    advance(10_000);

    expect(screen.queryByTestId('possessed-ghost-cursor')).toBeNull();
  });

  it('restores the native cursor on unmount', () => {
    const { unmount } = render(<PossessedCursor />);

    unmount();

    expect(document.documentElement.dataset.possessedCursor).toBeUndefined();
    expect(
      document.documentElement.style.getPropertyValue('--possessed-cursor'),
    ).toBe('');
  });
});
