import { expect, test } from '@playwright/test';

import { getHomePage } from '../pages/HomePage';
import { setupE2eTestState } from '../utils/setup';

/** Squares per column, left to right. */
const COLUMN_COUNTS = [1, 2, 3, 4, 4, 3, 2, 1];

test('renders the artwork directly below the footer', {
  tag: '@smoke',
}, async ({ page }) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');
  await artwork.scrollIntoViewIfNeeded();

  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveAttribute('aria-hidden', 'true');

  const footerBox = await page.getByRole('contentinfo').boundingBox();
  const artworkBox = await artwork.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(artworkBox).not.toBeNull();

  if (!footerBox || !artworkBox) {
    throw new Error('Unable to measure the footer and artwork boxes');
  }

  expect(artworkBox.y).toBeGreaterThanOrEqual(footerBox.y + footerBox.height);
});

test('keeps the page free of horizontal overflow', async ({ page }) => {
  await setupE2eTestState(page);

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await getHomePage(page).goto();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test('stacks twenty squares in centred bell-curve columns', async ({
  page,
}) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');
  await artwork.scrollIntoViewIfNeeded();

  const pile = await page.evaluate(() => {
    const stage = document.querySelector('#footer-artwork');

    if (!stage) {
      throw new Error('artwork missing');
    }

    const stageBox = stage.getBoundingClientRect();
    const columns = [...stage.querySelectorAll('.panel-column')].map(
      (column) => {
        const cells = [...column.querySelectorAll('.panel-cell')].map(
          (cell) => {
            const box = cell.getBoundingClientRect();

            return {
              top: Math.round(box.top),
              left: Math.round(box.left),
              width: Math.round(box.width),
              height: Math.round(box.height),
              radius: Number.parseFloat(
                getComputedStyle(cell).borderTopLeftRadius,
              ),
            };
          },
        );

        const box = column.getBoundingClientRect();

        return {
          count: cells.length,
          top: Math.round(box.top),
          left: Math.round(box.left),
          right: Math.round(box.right),
          cells,
        };
      },
    );

    return {
      transform: getComputedStyle(stage).transform,
      stageBottom: Math.round(stageBox.bottom),
      stageLeft: Math.round(stageBox.left),
      stageRight: Math.round(stageBox.right),
      columns,
    };
  });

  expect(pile.transform).toBe('none');
  expect(pile.columns.map((column) => column.count)).toEqual(COLUMN_COUNTS);

  // The pile rests on the horizon: every column ends on the stage's bottom.
  for (const column of pile.columns) {
    const lastCell = column.cells.at(-1);
    expect(lastCell).toBeDefined();

    if (!lastCell) {
      throw new Error('column has no cells');
    }

    expect(
      Math.abs(pile.stageBottom - (lastCell.top + lastCell.height)),
    ).toBeLessThanOrEqual(1);
  }

  // The wall is centred on the stage: the outer columns leave equal gutters.
  const firstColumn = pile.columns[0];
  const lastColumn = pile.columns.at(-1);

  if (!firstColumn || !lastColumn) {
    throw new Error('artwork has no columns');
  }

  expect(firstColumn.left - pile.stageLeft).toBe(
    pile.stageRight - lastColumn.right,
  );

  // Squares are 1:1, rounded, and stack flush inside their column.
  for (const column of pile.columns) {
    const head = column.cells[0];

    if (!head) {
      throw new Error('column has no cells');
    }

    column.cells.forEach((cell, index) => {
      expect(Math.abs(cell.width - cell.height)).toBeLessThanOrEqual(1);
      expect(cell.radius).toBeGreaterThan(0);
      expect(cell.width).toBeLessThanOrEqual(64);
      expect(cell.width).toBeGreaterThanOrEqual(24);
      expect(cell.left).toBe(head.left);

      if (index > 0) {
        const previous = column.cells[index - 1];
        expect(cell.top).toBe(previous.top + previous.height);
      }
    });
  }
});

test('moves the dye when scrolling away from the horizon', async ({ page }) => {
  await setupE2eTestState(page);
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');
  await artwork.scrollIntoViewIfNeeded();

  const readProgress = () =>
    page.evaluate(() => {
      const cell = document.querySelector('.panel-cell');

      if (!cell) {
        throw new Error('panel cell missing');
      }

      const animation = document
        .getAnimations()
        .find(
          (entry) => (entry.effect as KeyframeEffect | null)?.target === cell,
        );

      return animation?.effect?.getComputedTiming().progress ?? 0;
    });

  // Park at the bottom of the page, where the pile rests on the horizon.
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await page.waitForTimeout(400);
  const atRest = await readProgress();

  await page.evaluate(() => window.scrollBy(0, -200));
  await page.waitForTimeout(400);
  const scrolled = await readProgress();

  // The view() timeline must still be live at rest, otherwise scrolling up
  // leaves the dye frozen at the end of its range.
  expect(atRest).toBeGreaterThan(0);
  expect(scrolled).toBeLessThan(atRest);
});

test('freezes the dye under reduced motion', async ({ page }) => {
  await setupE2eTestState(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await getHomePage(page).goto();

  const artwork = page.getByTestId('footer-artwork');
  await artwork.scrollIntoViewIfNeeded();

  const animationName = await page.evaluate(() => {
    const cell = document.querySelector('.panel-cell');

    if (!cell) {
      throw new Error('panel cell missing');
    }

    return getComputedStyle(cell, '::before').animationName;
  });

  expect(animationName).toBe('none');
});
