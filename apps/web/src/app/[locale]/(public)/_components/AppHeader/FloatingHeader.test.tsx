/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';

import { FloatingHeader } from './FloatingHeader';

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('FloatingHeader', () => {
  afterEach(() => setScrollY(0));

  it('renders flush, without a shadow, at the top of the page', () => {
    const { container } = render(<FloatingHeader>content</FloatingHeader>);

    expect(container.querySelector('header')).not.toHaveClass('shadow-md');
  });

  it('casts a drop shadow once the page is scrolled', () => {
    const { container } = render(<FloatingHeader>content</FloatingHeader>);

    act(() => {
      setScrollY(240);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(container.querySelector('header')).toHaveClass('shadow-md');
  });
});
