/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { FooterArtworkTiles } from './FooterArtworkTiles';
import { createFooterArtworkPile } from './footer-artwork-panels';

const columns = createFooterArtworkPile().columns;

const findCell = (container: Element) => {
  const cell = container.querySelector<HTMLElement>('.panel-cell');

  if (!cell) {
    throw new Error('panel cell missing');
  }

  return cell;
};

const readColors = (cell: HTMLElement) => [
  cell.style.getPropertyValue('--panel-c1'),
  cell.style.getPropertyValue('--panel-c2'),
];

const originalRaf = window.requestAnimationFrame;
const originalMatchMedia = window.matchMedia;

const flushFrame = (callback: FrameRequestCallback) => {
  callback(0);

  return 1;
};

beforeEach(() => {
  window.requestAnimationFrame = flushFrame;
  window.cancelAnimationFrame = () => undefined;
});

afterEach(() => {
  window.requestAnimationFrame = originalRaf;
  window.matchMedia = originalMatchMedia;
});

describe('FooterArtworkTiles', () => {
  it('renders the resting colours before any pointer input', () => {
    const { container } = render(<FooterArtworkTiles columns={columns} />);
    const cell = findCell(container);

    expect(readColors(cell)[0]).toMatch(/^rgb\(\d+ \d+ \d+\)$/);
  });

  it('recolours the tiles when the pointer moves', () => {
    const { container } = render(<FooterArtworkTiles columns={columns} />);
    const cell = findCell(container);
    const before = readColors(cell);

    fireEvent.pointerMove(window, { clientX: 1024, clientY: 0 });

    expect(readColors(cell)).not.toEqual(before);
  });

  it('keeps the colours static under reduced motion', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });

    const { container } = render(<FooterArtworkTiles columns={columns} />);
    const cell = findCell(container);
    const before = readColors(cell);

    fireEvent.pointerMove(window, { clientX: 1024, clientY: 0 });

    expect(readColors(cell)).toEqual(before);
  });
});
