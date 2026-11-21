/**
 * @jest-environment jsdom
 */
import {
  collectInvalidFields,
  countFilledFields,
  countFormFields,
  findUnscopedActions,
  getLinkKind,
  isSensitiveField,
  isTrackingSuppressed,
  readPressedState,
  readRangeBucket,
  readReferrerKind,
  readViewportBucket,
  requiredImpressionRatio,
  resolveActionLabel,
  resolveFormKey,
  resolveImpressionKey,
  resolveResourceKind,
  resolveSection,
  resolveSegmentedSelection,
  resolveSelectSelection,
} from './capture';

describe('capture helpers', () => {
  it('classifies links', () => {
    const origin = 'https://site.test';
    expect(getLinkKind('/en/articles/', origin)).toBe('internal');
    expect(getLinkKind('https://other.test/x', origin)).toBe('external');
    expect(getLinkKind('#section', origin)).toBe('hash');
    expect(getLinkKind('mailto:a@b.test', origin)).toBe('mailto');
    expect(getLinkKind('tel:+123', origin)).toBe('tel');
  });

  it('classifies the referrer', () => {
    expect(readReferrerKind('', 'https://site.test')).toBe('direct');
    expect(readReferrerKind('https://site.test/x', 'https://site.test')).toBe(
      'internal',
    );
    expect(readReferrerKind('https://google.test/', 'https://site.test')).toBe(
      'external',
    );
  });

  it('buckets viewports', () => {
    expect(readViewportBucket(375)).toBe('xs');
    expect(readViewportBucket(700)).toBe('sm');
    expect(readViewportBucket(900)).toBe('md');
    expect(readViewportBucket(1100)).toBe('lg');
    expect(readViewportBucket(1600)).toBe('xl');
  });

  it('buckets slider values by their usable range', () => {
    expect(readRangeBucket(0, 0, 100)).toBe(0);
    expect(readRangeBucket(54, 0, 100)).toBe(50);
    expect(readRangeBucket(96, 0, 100)).toBe(100);
    expect(readRangeBucket(10, 0, 19)).toBe(50);
    expect(readRangeBucket(19, 0, 19)).toBe(100);
    expect(readRangeBucket(-5, 0, 100)).toBe(0);
    expect(readRangeBucket(150, 0, 100)).toBe(100);
    expect(readRangeBucket(5, 0, 0)).toBe(0);
    expect(readRangeBucket(Number.NaN, 0, 100)).toBe(0);
  });

  it('resolves sections, forms and impression keys', () => {
    document.body.innerHTML = `
      <section data-track-section="content:article">
        <form id="comment-form"><input name="body" aria-invalid="true" /></form>
        <div data-track-impression="carousel:card" data-track-index="3"></div>
        <div data-track-impression="hero" data-track-key="front"></div>
      </section>
    `;

    const input = document.querySelector('input');
    const form = document.querySelector('form');
    const indexed = document.querySelector('[data-track-index]');
    const keyed = document.querySelector('[data-track-key]');

    expect(resolveSection(input as Element)).toBe('content:article');
    expect(resolveFormKey(form as HTMLFormElement)).toBe('comment-form');
    expect(resolveImpressionKey(indexed as Element)).toBe(
      'content:article:carousel:card:3',
    );
    expect(resolveImpressionKey(keyed as Element)).toBe(
      'content:article:hero:front',
    );
    expect(collectInvalidFields(form as HTMLFormElement)).toEqual(['body']);
  });

  it('keeps anonymous forms distinct', () => {
    document.body.innerHTML = '<form></form><form></form>';
    const [first, second] = Array.from(document.querySelectorAll('form'));

    expect(resolveFormKey(first as HTMLFormElement)).toMatch(/^anonymous-\d+$/);
    expect(resolveFormKey(second as HTMLFormElement)).toMatch(
      /^anonymous-\d+$/,
    );
    expect(resolveFormKey(first as HTMLFormElement)).not.toBe(
      resolveFormKey(second as HTMLFormElement),
    );
  });

  it('resolves segmented control selections', () => {
    document.body.innerHTML = `
      <section data-track-section="subscription:plans">
        <div data-slot="toggle-group" data-track-control="subscription:billing-cycle">
          <button data-slot="toggle-group-item" data-value="monthly"
            aria-pressed="false">Monthly</button>
          <button data-slot="toggle-group-item" data-value="yearly"
            aria-pressed="true">Yearly</button>
        </div>
        <div data-slot="radio-group">
          <button data-slot="radio-group-item" value="a" aria-checked="true">A</button>
        </div>
      </section>
    `;

    const yearly = document.querySelector('[data-value="yearly"]') as Element;
    const monthly = document.querySelector('[data-value="monthly"]') as Element;
    const radio = document.querySelector('[data-slot="radio-group-item"]');

    expect(resolveSegmentedSelection(yearly)).toMatchObject({
      control: 'subscription:billing-cycle',
      index: 1,
      count: 2,
      value: 'yearly',
    });
    expect(resolveSegmentedSelection(monthly)).toMatchObject({
      index: 0,
      value: 'monthly',
    });
    expect(readPressedState(yearly)).toBe(true);
    expect(readPressedState(monthly)).toBe(false);

    // Radio items fall back to the group slot when no control name is set.
    expect(resolveSegmentedSelection(radio as Element)).toMatchObject({
      control: 'radio-group',
      index: 0,
      count: 1,
    });
    expect(readPressedState(radio as Element)).toBe(true);

    expect(resolveSegmentedSelection(document.body)).toBeNull();
  });

  it('resolves annotated Base UI select options', () => {
    document.body.innerHTML = `
      <div data-slot="select-content" data-track-control="auth:gender"
        data-track-section="auth:signup">
        <div role="listbox">
          <div data-slot="select-item" data-value="female">Female</div>
          <div data-slot="select-item" data-value="male">Male</div>
        </div>
      </div>
      <div data-slot="select-content">
        <div role="listbox">
          <div data-slot="select-item" data-value="en">English</div>
        </div>
      </div>
    `;

    const male = document.querySelector('[data-value="male"]') as Element;
    const female = document.querySelector('[data-value="female"]') as Element;
    const language = document.querySelector('[data-value="en"]') as Element;

    expect(resolveSelectSelection(male)).toMatchObject({
      control: 'auth:gender',
      index: 1,
      count: 2,
      value: 'male',
    });
    expect(resolveSelectSelection(female)).toMatchObject({ index: 0 });
    // Unannotated popups (the language switcher) keep their explicit event.
    expect(resolveSelectSelection(language)).toBeNull();
    expect(resolveSelectSelection(document.body)).toBeNull();
  });

  it('resolves accessible labels without reading text', () => {
    document.body.innerHTML = `
      <button id="a" data-track-label="settings:reset" aria-label="Reset" title="Tooltip">Text</button>
      <button id="b" aria-label="Share article">Icon</button>
      <button id="c" title="Tooltip only">Icon</button>
      <button id="d">Text only</button>
    `;

    expect(resolveActionLabel(document.getElementById('a') as Element)).toBe(
      'settings:reset',
    );
    expect(resolveActionLabel(document.getElementById('b') as Element)).toBe(
      'Share article',
    );
    expect(resolveActionLabel(document.getElementById('c') as Element)).toBe(
      'Tooltip only',
    );
    expect(
      resolveActionLabel(document.getElementById('d') as Element),
    ).toBeUndefined();
  });

  it('maps resource kinds', () => {
    expect(resolveResourceKind('IMG')).toBe('image');
    expect(resolveResourceKind('script')).toBe('script');
    expect(resolveResourceKind('DIV')).toBe('other');
  });

  it('finds action elements that would emit without a section', () => {
    document.body.innerHTML = `
      <header data-track-section="navigation:header">
        <button id="scoped">Scoped</button>
        <div data-track-ignore>
          <button id="ignored">Ignored</button>
        </div>
      </header>
      <main>
        <button id="unscoped">Unscoped</button>
        <a id="link" href="/x">Link</a>
        <div role="button" id="role-button">Role</div>
        <div role="switch" id="role-switch"></div>
        <div role="checkbox" id="role-checkbox"></div>
        <div role="radio" id="role-radio"></div>
        <div role="option" id="role-option"></div>
        <input id="text-field" />
        <input id="hidden-field" type="hidden" />
        <span>Not an action</span>
      </main>
      <div id="portal">
        <button id="portaled">Portaled</button>
      </div>
      <footer data-track-section="not:a:section">
        <button id="unknown-section">Unknown section</button>
      </footer>
      <div hidden><button id="visually-hidden">Hidden</button></div>
    `;

    const unscoped = findUnscopedActions(document).map((element) => element.id);

    expect(unscoped).toEqual([
      'unscoped',
      'link',
      'role-button',
      'role-switch',
      'role-checkbox',
      'role-radio',
      'role-option',
      'text-field',
      'portaled',
      'unknown-section',
    ]);

    // Scoping the portaled container is what a dialog/sheet/popover needs.
    document
      .getElementById('portal')
      ?.setAttribute('data-track-section', 'share:modal');
    expect(findUnscopedActions(document).map((element) => element.id)).toEqual([
      'unscoped',
      'link',
      'role-button',
      'role-switch',
      'role-checkbox',
      'role-radio',
      'role-option',
      'text-field',
      'unknown-section',
    ]);
  });
});

describe('capture privacy guards', () => {
  it('identifies credential and payment fields', () => {
    const password = document.createElement('input');
    password.type = 'password';
    expect(isSensitiveField(password)).toBe(true);

    const card = document.createElement('input');
    card.name = 'cardNumber';
    expect(isSensitiveField(card)).toBe(true);

    const otp = document.createElement('input');
    otp.name = 'one-time-code';
    expect(isSensitiveField(otp)).toBe(true);

    const email = document.createElement('input');
    email.name = 'email';
    expect(isSensitiveField(email)).toBe(false);

    const emptyName = document.createElement('input');
    emptyName.name = '';
    emptyName.id = 'password';
    expect(isSensitiveField(emptyName)).toBe(true);
  });

  it('counts visible Base UI choice roots as form controls', () => {
    document.body.innerHTML = `
      <form>
        <input name="email" value="jane@example.test" />
        <div role="checkbox" aria-checked="true"></div>
        <div role="switch" aria-checked="false"></div>
        <div role="radio" aria-checked="true"></div>
        <input type="radio" aria-hidden="true" tabindex="-1" />
      </form>
    `;

    const form = document.querySelector('form') as HTMLFormElement;

    expect(countFormFields(form)).toBe(4);
    expect(countFilledFields(form)).toBe(3);
  });

  it('ignores Base UI mirror inputs when counting form state', () => {
    document.body.innerHTML = `
      <form>
        <input name="email" value="jane@example.test" />
        <input type="checkbox" name="consent" />
        <input type="checkbox" name="newsletter" checked />
        <input type="checkbox" aria-hidden="true" tabindex="-1" />
        <input type="hidden" name="csrf" value="x" />
        <textarea name="message"></textarea>
      </form>
    `;

    const form = document.querySelector('form') as HTMLFormElement;

    expect(countFormFields(form)).toBe(4);
    // email + checked newsletter; the unchecked box and the mirror/hidden
    // inputs must not count as filled.
    expect(countFilledFields(form)).toBe(2);
  });

  it('never audits aria-hidden mirror controls', () => {
    document.body.innerHTML = `
      <div>
        <input type="checkbox" aria-hidden="true" tabindex="-1" />
        <button type="button">Visible</button>
      </div>
    `;

    expect(findUnscopedActions(document).map((el) => el.tagName)).toEqual([
      'BUTTON',
    ]);
  });

  it('detects only the debug route', () => {
    window.history.replaceState({}, '', '/en/debug/');
    expect(isTrackingSuppressed()).toBe(true);

    window.history.replaceState({}, '', '/debug');
    expect(isTrackingSuppressed()).toBe(true);

    window.history.replaceState({}, '', '/en/debugging/');
    expect(isTrackingSuppressed()).toBe(false);

    window.history.replaceState({}, '', '/en/articles/debug/');
    expect(isTrackingSuppressed()).toBe(false);

    window.history.replaceState({}, '', '/en/articles/');
    expect(isTrackingSuppressed()).toBe(false);
  });
});

describe('impression ratio', () => {
  it('requires half the element for viewport-sized content', () => {
    expect(requiredImpressionRatio(400, 800)).toBe(0.5);
  });

  it('scales down for elements taller than the viewport', () => {
    // 3000px element in a 1000px viewport: 0.5 * 1000 / 3000 ≈ 0.167.
    expect(requiredImpressionRatio(3000, 1000)).toBeCloseTo(1 / 6, 5);
    expect(requiredImpressionRatio(6000, 1000)).toBeCloseTo(1 / 12, 5);
  });

  it('falls back to the plain threshold without layout information', () => {
    expect(requiredImpressionRatio(0, 800)).toBe(0.5);
    expect(requiredImpressionRatio(Number.NaN, 800)).toBe(0.5);
    expect(requiredImpressionRatio(400, 0)).toBe(0.5);
  });
});
