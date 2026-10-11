/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Question } from './Question';

beforeAll(() => {
  // jsdom ships without `PointerEvent`, so `fireEvent` would otherwise throw
  // when Base UI dispatches the constructed click that selects a radio.
  if (typeof globalThis.PointerEvent === 'undefined') {
    class PointerEventPolyfill extends MouseEvent {
      pointerType: string;

      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerType = init.pointerType ?? 'mouse';
      }
    }

    Object.defineProperty(globalThis, 'PointerEvent', {
      configurable: true,
      writable: true,
      value: PointerEventPolyfill,
    });
  }
});

const data = {
  id: 'question-1',
  text: 'El tudod ezt olvasni?',
  options: [
    { id: 'option-1', label: 'Igen' },
    { id: 'option-2', label: 'Analfabéta vagyok' },
  ],
};

describe('Question', () => {
  it('renders one radio per option', () => {
    render(<Question data={data} selectOption={jest.fn()} />);

    expect(screen.getAllByRole('radio')).toHaveLength(data.options.length);
    for (const option of data.options) {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  });

  it('centres the selected dot inside the ring', () => {
    render(<Question data={data} selectOption={jest.fn()} />);

    const radio = screen.getByTestId('flaim-survey-option-1');
    fireEvent.click(radio);

    expect(radio).toHaveAttribute('aria-checked', 'true');

    const indicator = radio.querySelector(
      '[data-slot="radio-group-indicator"]',
    );
    expect(indicator).not.toBeNull();
    // The indicator must fill the radio and centre its dot; it has no intrinsic
    // height, so without `size-4` the dot used to sit off-centre.
    expect(indicator).toHaveClass('size-4', 'items-center', 'justify-center');

    const dot = indicator?.querySelector('span');
    expect(dot).not.toBeNull();
    // The dot is a plain, sized span. It must not be a FontAwesome icon:
    // FontAwesome's unlayered `.svg-inline--fa` stylesheet (width 1.25em,
    // height 1em) outranks Tailwind's `size-2` and overflowed the 16px ring.
    expect(dot).toHaveClass('size-2');
    expect(radio.querySelector('svg')).toBeNull();
  });
});
