/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import { RollingNumber } from './RollingNumber';

describe('RollingNumber', () => {
  it('exposes the full formatted value to assistive technology', () => {
    const { container } = render(<RollingNumber value="$99.00/mo" />);

    const accessibleText = container.querySelectorAll('.sr-only');
    expect(accessibleText).toHaveLength(1);
    expect(accessibleText[0]).toHaveTextContent('$99.00/mo');
  });

  it('renders one rolling wheel per digit and leaves other characters static', () => {
    const { container } = render(<RollingNumber value="$99.00/mo" />);

    expect(container.querySelectorAll('[data-rolling-digit]')).toHaveLength(4);
  });

  it('reuses the same wheel and retargets it when the value changes', () => {
    const { container, rerender } = render(<RollingNumber value="$99.00/mo" />);
    const [initialWheel] = Array.from(
      container.querySelectorAll('[data-rolling-digit]'),
    );
    expect(initialWheel).toHaveAttribute('data-rolling-digit', '9');

    rerender(<RollingNumber value="$89.00/mo" />);

    const [updatedWheel] = Array.from(
      container.querySelectorAll('[data-rolling-digit]'),
    );
    expect(updatedWheel).toBe(initialWheel);
    expect(updatedWheel).toHaveAttribute('data-rolling-digit', '8');
  });

  it('renders values without digits as plain text', () => {
    const { container } = render(<RollingNumber value="/mo" />);

    expect(container.querySelectorAll('[data-rolling-digit]')).toHaveLength(0);
    expect(container).toHaveTextContent('/mo');
  });
});
