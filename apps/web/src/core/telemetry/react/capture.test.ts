/**
 * @jest-environment jsdom
 */
import {
  collectInvalidFields,
  getLinkKind,
  readPressedState,
  readReferrerKind,
  readViewportBucket,
  resolveActionLabel,
  resolveFormKey,
  resolveImpressionKey,
  resolveResourceKind,
  resolveSection,
  resolveSegmentedSelection,
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

  it('resolves sections, forms and impression keys', () => {
    document.body.innerHTML = `
      <section data-track-section="article">
        <form id="comment-form"><input name="body" aria-invalid="true" /></form>
        <div data-track-impression="carousel:card" data-track-index="3"></div>
        <div data-track-impression="hero" data-track-key="front"></div>
      </section>
    `;

    const input = document.querySelector('input');
    const form = document.querySelector('form');
    const indexed = document.querySelector('[data-track-index]');
    const keyed = document.querySelector('[data-track-key]');

    expect(resolveSection(input as Element)).toBe('article');
    expect(resolveFormKey(form as HTMLFormElement)).toBe('comment-form');
    expect(resolveImpressionKey(indexed as Element)).toBe('carousel:card:3');
    expect(resolveImpressionKey(keyed as Element)).toBe('hero:front');
    expect(collectInvalidFields(form as HTMLFormElement)).toEqual([
      { field: 'body', code: 'invalid' },
    ]);
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
});
