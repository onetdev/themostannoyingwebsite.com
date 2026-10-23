/**
 * @jest-environment jsdom
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { track, trackOnce } from '@/core/telemetry';
import { useInteractionTracking } from './useInteractionTracking';

jest.mock('@/core/i18n/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('@/core/telemetry', () => ({
  track: jest.fn(),
  trackOnce: jest.fn(),
  telemetry: {
    notifyRouteChange: jest.fn(),
    flush: jest.fn(),
    getInteractionCount: jest.fn(() => 0),
  },
}));

const trackMock = track as unknown as jest.Mock;
const trackOnceMock = trackOnce as unknown as jest.Mock;

function Harness() {
  useInteractionTracking();
  return null;
}

function findCall(name: string) {
  return trackMock.mock.calls.find(([eventName]) => eventName === name);
}

describe('useInteractionTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState({}, '', '/en/articles/test/');
    document.documentElement.lang = 'en';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts a session once', () => {
    render(<Harness />);
    expect(trackOnceMock).toHaveBeenCalledWith(
      'session:start',
      'session.start',
      expect.objectContaining({ entryRoute: '/en/articles/test/' }),
    );
  });

  it('captures delegated clicks with slot and section', () => {
    render(
      <>
        <Harness />
        <div data-track-section="article">
          <button type="button" data-slot="button" data-variant="outline">
            Read more
          </button>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Read more'));

    expect(findCall('ui.click')?.[1]).toMatchObject({
      slot: 'button',
      tag: 'button',
      section: 'article',
      variant: 'outline',
    });
  });

  it('captures native buttons without design-system slots', () => {
    render(
      <>
        <Harness />
        <button type="button">Raw</button>
      </>,
    );

    fireEvent.click(screen.getByText('Raw'));

    expect(findCall('ui.click')?.[1]).toMatchObject({
      slot: 'button',
      tag: 'button',
    });
  });

  it('respects data-track-ignore', () => {
    render(
      <>
        <Harness />
        <div data-track-ignore>
          <button type="button">Secret</button>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Secret'));

    expect(findCall('ui.click')).toBeUndefined();
  });

  it('records the chosen segmented-control value', () => {
    jest.useFakeTimers();
    render(
      <>
        <Harness />
        <div data-track-section="subscription:plans">
          <div
            data-slot="toggle-group"
            data-track-control="subscription:billing-cycle"
          >
            <button
              type="button"
              data-slot="toggle-group-item"
              data-value="monthly"
              aria-pressed="false"
            >
              Monthly
            </button>
            <button
              type="button"
              data-slot="toggle-group-item"
              data-value="yearly"
              aria-pressed="true"
            >
              Yearly
            </button>
          </div>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Yearly'));

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(findCall('ui.select')?.[1]).toEqual({
      control: 'subscription:billing-cycle',
      optionIndex: 1,
      optionCount: 2,
      value: 'yearly',
      checked: true,
      section: 'subscription:plans',
    });
    expect(findCall('ui.click')).toBeUndefined();
  });

  it('includes the item identity and accessible label in ui.click', () => {
    render(
      <>
        <Harness />
        <div data-track-section="funding:donation">
          <button
            type="button"
            data-track="donation:tier"
            data-value="premium"
            aria-label="Select premium tier"
          >
            Premium
          </button>
          <button
            type="button"
            data-track="settings:pain-preferences:disable-all"
          >
            Disable all
          </button>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Premium'));
    expect(findCall('ui.click')?.[1]).toMatchObject({
      trackKey: 'donation:tier',
      value: 'premium',
      section: 'funding:donation',
      label: 'Select premium tier',
    });

    trackMock.mockClear();
    fireEvent.click(screen.getByText('Disable all'));
    expect(findCall('ui.click')?.[1]).toMatchObject({
      trackKey: 'settings:pain-preferences:disable-all',
      section: 'funding:donation',
    });
  });

  it('classifies link clicks', () => {
    render(
      <>
        <Harness />
        <a href="https://elsewhere.test/page">Elsewhere</a>
      </>,
    );

    fireEvent.click(screen.getByText('Elsewhere'));

    expect(findCall('nav.link-click')?.[1]).toMatchObject({
      kind: 'external',
      path: '/page',
    });
  });

  it('tracks form lifecycle and validation failures', () => {
    jest.useFakeTimers();
    render(
      <>
        <Harness />
        <form data-track-form="auth:login">
          <input name="email" aria-invalid="true" defaultValue="x" />
          <button type="submit">Send</button>
        </form>
      </>,
    );

    const form = document.querySelector('form') as HTMLFormElement;
    fireEvent.focusIn(form.querySelector('input') as HTMLInputElement);
    expect(findCall('form.start')?.[1]).toMatchObject({ form: 'auth:login' });

    fireEvent.submit(form);
    expect(findCall('form.submit')?.[1]).toMatchObject({ form: 'auth:login' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(findCall('form.submit-failed')?.[1]).toMatchObject({
      form: 'auth:login',
      reason: 'validation',
      invalidFields: 'email',
    });
    expect(findCall('input.validation-failed')?.[1]).toMatchObject({
      field: 'email',
      form: 'auth:login',
    });
  });

  it('captures toggles and selects', () => {
    render(
      <>
        <Harness />
        <form data-track-form="settings">
          <input type="checkbox" name="darkMode" />
          <select name="locale">
            <option>en</option>
            <option>de</option>
          </select>
        </form>
      </>,
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(findCall('ui.toggle')?.[1]).toMatchObject({
      control: 'darkMode',
      checked: true,
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } });
    expect(findCall('ui.select')?.[1]).toMatchObject({
      control: 'locale',
      optionIndex: 1,
      optionCount: 2,
    });
  });

  it('captures named range sliders by their usable range', () => {
    render(
      <>
        <Harness />
        <div data-track-section="navigation:pain-level">
          <input
            type="range"
            min="0"
            max="19"
            defaultValue="10"
            data-track-field="pain-level"
          />
        </div>
      </>,
    );

    fireEvent.change(screen.getByRole('slider'), {
      target: { value: '10' },
    });

    expect(findCall('ui.slider')?.[1]).toEqual({
      control: 'pain-level',
      valueBucket: 50,
      section: 'navigation:pain-level',
    });
  });

  it('does not capture while on the debug route', () => {
    window.history.replaceState({}, '', '/en/debug/');
    render(
      <>
        <Harness />
        <button type="button">Hidden</button>
      </>,
    );

    fireEvent.click(screen.getByText('Hidden'));

    expect(findCall('ui.click')).toBeUndefined();
  });
});
