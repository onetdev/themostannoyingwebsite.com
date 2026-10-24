/**
 * @jest-environment jsdom
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { track } from '@/core/telemetry';
import { useInteractionTracking } from './useInteractionTracking';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('@/core/i18n/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('@/core/telemetry', () => ({
  track: jest.fn(),
  telemetry: {
    notifyRouteChange: jest.fn(),
    flush: jest.fn(),
    getInteractionCount: jest.fn(() => 0),
  },
}));

const trackMock = track as unknown as jest.Mock;
const useLocaleMock = useLocale as unknown as jest.Mock;

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
    useLocaleMock.mockReturnValue('en');
    window.history.replaceState({}, '', '/en/articles/test/');
    document.documentElement.lang = 'en';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts a session once', () => {
    render(<Harness />);
    expect(trackMock).toHaveBeenCalledWith(
      'session.start',
      expect.objectContaining({ entryRoute: '/en/articles/test/' }),
    );
  });

  it('does not abandon forms on a locale-only change', () => {
    const { rerender } = render(
      <>
        <Harness />
        <form data-track-form="auth:login">
          <input name="email" />
        </form>
      </>,
    );

    fireEvent.focusIn(screen.getByRole('textbox'));
    expect(findCall('form.start')?.[1]).toMatchObject({ form: 'auth:login' });

    useLocaleMock.mockReturnValue('de');
    rerender(
      <>
        <Harness />
        <form data-track-form="auth:login">
          <input name="email" />
        </form>
      </>,
    );

    expect(findCall('form.abandoned')).toBeUndefined();
    expect(findCall('nav.route-view')).toBeDefined();
  });

  it('captures delegated clicks with slot and section', () => {
    render(
      <>
        <Harness />
        <div data-track-section="content:article">
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
      section: 'content:article',
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

  it('respects data-track-ignore for change, focus and submit paths', () => {
    render(
      <>
        <Harness />
        <div data-track-ignore>
          <form data-track-form="ignored">
            <input name="message" data-track-input defaultValue="x" />
            <input type="checkbox" name="consent" />
          </form>
        </div>
      </>,
    );

    const form = document.querySelector('form') as HTMLFormElement;
    const text = form.querySelector(
      'input[name="message"]',
    ) as HTMLInputElement;
    const checkbox = form.querySelector(
      'input[name="consent"]',
    ) as HTMLInputElement;

    fireEvent.focusIn(text);
    fireEvent.focusOut(text);
    fireEvent.change(checkbox);
    fireEvent.submit(form);

    expect(findCall('form.start')).toBeUndefined();
    expect(findCall('form.submit')).toBeUndefined();
    expect(findCall('input.change')).toBeUndefined();
    expect(findCall('ui.toggle')).toBeUndefined();
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
      optionValue: 'yearly',
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
      optionValue: 'premium',
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

  it('records a pick in an annotated select popup', () => {
    render(
      <>
        <Harness />
        <div
          data-slot="select-content"
          data-track-control="auth:gender"
          data-track-section="auth:signup"
        >
          <div data-slot="select-item" data-value="female">
            Female
          </div>
          <div data-slot="select-item" data-value="male">
            Male
          </div>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Male'));

    expect(findCall('ui.select')?.[1]).toMatchObject({
      control: 'auth:gender',
      optionIndex: 1,
      optionCount: 2,
      optionValue: 'male',
      section: 'auth:signup',
    });
  });

  it('reports an unsubmitted form as abandoned when the page is left', () => {
    render(
      <>
        <Harness />
        <form data-track-form="auth:login">
          <input name="email" defaultValue="jane@example.test" />
        </form>
      </>,
    );

    fireEvent.focusIn(screen.getByRole('textbox'));
    window.dispatchEvent(new Event('pagehide'));

    const abandoned = trackMock.mock.calls.filter(
      ([name]) => name === 'form.abandoned',
    );
    expect(abandoned).toHaveLength(1);
    expect(abandoned[0]?.[1]).toMatchObject({
      form: 'auth:login',
      fieldCount: 1,
      filledFields: 1,
    });
  });

  it('keeps the session when the page goes into the back/forward cache', () => {
    render(<Harness />);

    const pageHide = new Event('pagehide');
    Object.defineProperty(pageHide, 'persisted', { value: true });
    window.dispatchEvent(pageHide);

    expect(findCall('session.end')).toBeUndefined();
  });

  it('records a page view for every route', () => {
    render(<Harness />);

    expect(findCall('nav.route-view')?.[1]).toEqual({ route: '/' });
  });

  it('attributes link clicks without forwarding mailto addresses', () => {
    render(
      <>
        <Harness />
        <div data-track-section="support:contact">
          <a
            href="mailto:info@example.test"
            data-track="contact:email"
            aria-label="Email us"
          >
            Email
          </a>
        </div>
        <div data-track-section="navigation:toc">
          <a
            href="/en/articles/#intro"
            data-track="navigation:toc"
            data-track-key="intro"
          >
            Intro
          </a>
        </div>
      </>,
    );

    fireEvent.click(screen.getByText('Email'));

    const mail = findCall('nav.link-click')?.[1] as Record<string, unknown>;
    expect(mail).toMatchObject({
      kind: 'mailto',
      trackKey: 'contact:email',
      label: 'Email us',
      section: 'support:contact',
    });
    expect(mail).not.toHaveProperty('path');

    trackMock.mockClear();
    fireEvent.click(screen.getByText('Intro'));

    expect(findCall('nav.link-click')?.[1]).toMatchObject({
      kind: 'internal',
      path: '/en/articles/',
      trackKey: 'navigation:toc',
      key: 'intro',
      section: 'navigation:toc',
    });
  });

  it('never reports credential fields on opted-in forms', () => {
    render(
      <>
        <Harness />
        <form data-track-form="auth:login">
          <input name="email" type="email" data-track-input />
          <input name="password" type="password" defaultValue="hunter2" />
          <input name="cardNumber" type="text" defaultValue="4242" />
        </form>
      </>,
    );

    const inputs = document.querySelectorAll('input');
    fireEvent.focusOut(inputs[1] as Element);
    fireEvent.focusOut(inputs[2] as Element);
    expect(findCall('input.change')).toBeUndefined();

    fireEvent.focusOut(inputs[0] as Element);
    expect(findCall('input.change')?.[1]).toMatchObject({ field: 'email' });
  });

  it('reports standalone Base UI controls without double-reporting mirrors', () => {
    render(
      <>
        <Harness />
        <div data-track-section="marketing:survey">
          <div data-slot="radio-group" data-track-control="survey:answer">
            <input
              type="radio"
              name="answer"
              aria-hidden="true"
              tabIndex={-1}
              readOnly
            />
          </div>
          <input
            type="checkbox"
            name="chaos"
            aria-hidden="true"
            tabIndex={-1}
            readOnly
          />
        </div>
      </>,
    );

    fireEvent.change(screen.getByRole('radio', { hidden: true }));
    expect(findCall('ui.toggle')).toBeUndefined();

    fireEvent.change(screen.getByRole('checkbox', { hidden: true }));
    expect(findCall('ui.toggle')?.[1]).toMatchObject({
      control: 'chaos',
      source: 'checkbox',
    });
  });

  it('captures grouped radio selection from the mirror input', () => {
    jest.useFakeTimers();
    render(
      <>
        <Harness />
        <div data-track-section="marketing:survey">
          <div data-slot="radio-group" data-track-control="survey:answer">
            {/* biome-ignore lint/a11y/useSemanticElements: mirrors Base UI's span role=radio markup */}
            <span
              role="radio"
              data-slot="radio-group-item"
              data-value="option-a"
              aria-checked="false"
              tabIndex={0}
            />
            <input
              type="radio"
              name="answer"
              value="0"
              aria-hidden="true"
              tabIndex={-1}
              readOnly
            />
            {/* biome-ignore lint/a11y/useSemanticElements: mirrors Base UI's span role=radio markup */}
            <span
              role="radio"
              data-slot="radio-group-item"
              data-value="option-b"
              aria-checked="true"
              tabIndex={0}
            />
            <input
              type="radio"
              name="answer"
              value="1"
              aria-hidden="true"
              tabIndex={-1}
              readOnly
            />
          </div>
        </div>
      </>,
    );

    const inputs = document.querySelectorAll('input[type="radio"]');
    fireEvent.change(inputs[1] as Element, { target: { checked: true } });

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(findCall('ui.select')?.[1]).toEqual({
      control: 'survey:answer',
      optionIndex: 1,
      optionCount: 2,
      optionValue: 'option-b',
      checked: true,
      section: 'marketing:survey',
    });
    expect(findCall('ui.toggle')).toBeUndefined();
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
    expect(findCall('nav.route-view')).toBeUndefined();
  });
});
