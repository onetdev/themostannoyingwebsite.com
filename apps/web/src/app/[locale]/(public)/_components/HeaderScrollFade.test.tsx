/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';

import { HeaderScrollFade } from './HeaderScrollFade';

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  });
};

describe('HeaderScrollFade', () => {
  afterEach(() => setScrollY(0));

  it('stays transparent at the top of the page', () => {
    const { container } = render(<HeaderScrollFade />);

    expect(container.firstChild).toHaveClass('opacity-0');
  });

  it('fades in once the page is scrolled', () => {
    const { container } = render(<HeaderScrollFade />);

    act(() => {
      setScrollY(240);
      window.dispatchEvent(new Event('scroll'));
    });

    expect(container.firstChild).toHaveClass('opacity-100');
  });
});
