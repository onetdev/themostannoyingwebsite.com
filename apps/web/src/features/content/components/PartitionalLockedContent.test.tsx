/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { PartitionalLockedContent } from './PartitionalLockedContent';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('PartitionalLockedContent', () => {
  it('fades the locked content with an opacity mask instead of a color gradient', () => {
    const { container } = render(
      <PartitionalLockedContent initialMaxHeight={300}>
        <p>locked content</p>
      </PartitionalLockedContent>,
    );

    // Regression: the fade used to be a `card`-colored gradient, which showed
    // up as a mismatched band when the page background differed from `--card`.
    expect(container.querySelector('.bg-bottom-fadeout')).toBeNull();
    // The fade must be an alpha mask so whatever sits behind the content shows
    // through, regardless of its color.
    expect(
      container.querySelector('[class*="mask-fade-bottom"]'),
    ).not.toBeNull();
  });

  it('does not fade or render the paywall when inactive', () => {
    const { container } = render(
      <PartitionalLockedContent active={false} initialMaxHeight={300}>
        <p>locked content</p>
      </PartitionalLockedContent>,
    );

    expect(container.querySelector('[class*="mask-fade-bottom"]')).toBeNull();
    expect(screen.queryByTestId('paywall-overlay-cancel')).toBeNull();
  });

  it('reveals the content after the secondary action is used', () => {
    const { container } = render(
      <PartitionalLockedContent initialMaxHeight={300}>
        <p>locked content</p>
      </PartitionalLockedContent>,
    );

    fireEvent.click(screen.getByTestId('paywall-overlay-cancel'));

    expect(screen.queryByTestId('paywall-overlay-cancel')).toBeNull();
    expect(container.querySelector('[class*="mask-fade-bottom"]')).toBeNull();
  });
});
