/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { ShortPlayerProgress } from './ShortPlayerProgress';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ShortPlayerProgress', () => {
  it('renders a single seek thumb with the clip duration as its range', async () => {
    const video = document.createElement('video');

    await act(async () => {
      render(<ShortPlayerProgress video={video} durationMs={8042} />);
      await Promise.resolve();
    });

    expect(screen.getByRole('group', { name: 'seek' })).toBeVisible();
    expect(
      document.querySelectorAll('[data-slot="slider-thumb"]'),
    ).toHaveLength(1);
    expect(document.querySelector('input[type="range"]')).toHaveAttribute(
      'max',
      '8042',
    );
  });
});
