/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { AnimatedWheelState } from '../../hooks';
import { ModalContent } from './ModalContent';

type MockWheel = {
  isUnavailable: boolean;
  state: AnimatedWheelState;
  prize?: { index: number; color: string; text: string };
  items: { color: string; text: string }[];
  spin: jest.Mock;
  complete: jest.Mock;
};

let mockWof: MockWheel;

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('../../hooks', () => ({
  useWheelOfFortune: () => mockWof,
}));

jest.mock('./WheelAnimationWrapper', () => ({
  WheelAnimationWrapper: () => <div data-testid="wheel-animation" />,
}));

jest.mock('react-confetti', () => ({
  __esModule: true,
  default: () => null,
}));

const baseWheel = (): Omit<MockWheel, 'isUnavailable'> => ({
  state: 'ready',
  items: [{ color: '#fff', text: 'A prize' }],
  spin: jest.fn(),
  complete: jest.fn(),
});

const spinButtonName = /marketing\.wheelOfFortune\.spinStart/;

describe('ModalContent', () => {
  it('shows an error view instead of the wheel when the pool is unavailable', () => {
    mockWof = { ...baseWheel(), isUnavailable: true };
    render(<ModalContent />);

    expect(
      screen.getByText('marketing.wheelOfFortune.unavailable'),
    ).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    // The wheel must not render its placeholder slices.
    expect(screen.queryByTestId('wheel-animation')).toBeNull();
    expect(screen.queryByRole('button', { name: spinButtonName })).toBeNull();
  });

  it('renders the wheel and spin action when prizes are available', () => {
    mockWof = { ...baseWheel(), isUnavailable: false };
    render(<ModalContent />);

    expect(screen.getByTestId('wheel-animation')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: spinButtonName }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('keeps the footer content at a stable min-height across wheel states', () => {
    mockWof = { ...baseWheel(), isUnavailable: false };
    const { container, rerender } = render(<ModalContent />);

    const stableRegion = () => container.querySelector('.min-h-9');
    expect(stableRegion()).not.toBeNull();

    mockWof = { ...baseWheel(), isUnavailable: false, state: 'spinning' };
    rerender(<ModalContent />);
    expect(stableRegion()).not.toBeNull();

    mockWof = {
      ...baseWheel(),
      isUnavailable: false,
      state: 'completed',
      prize: { index: 0, color: '#fff', text: 'A prize' },
    };
    rerender(<ModalContent />);
    expect(stableRegion()).not.toBeNull();
    expect(
      screen.getByText('marketing.wheelOfFortune.spinWin'),
    ).toBeInTheDocument();
  });
});
