/**
 * @jest-environment jsdom
 */
import {
  collectInvalidFields,
  getLinkKind,
  readReferrerKind,
  readViewportBucket,
  resolveFormKey,
  resolveImpressionKey,
  resolveResourceKind,
  resolveSection,
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

  it('maps resource kinds', () => {
    expect(resolveResourceKind('IMG')).toBe('image');
    expect(resolveResourceKind('script')).toBe('script');
    expect(resolveResourceKind('DIV')).toBe('other');
  });
});
