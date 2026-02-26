import type { Point2d } from '@maw/utils/math';

export const getRelativePosition = (
  element: HTMLElement,
  target: HTMLElement,
) => {
  const rect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const x = targetRect.left - rect.left;
  const y = targetRect.top - rect.top;
  return { x, y };
};

export const isPointWithinElement = (element: HTMLElement, point: Point2d) => {
  const rect = element.getBoundingClientRect();
  return (
    point.x >= rect.left &&
    point.y >= rect.top &&
    point.x <= rect.right &&
    point.y <= rect.bottom
  );
};

export const inlineBase64File = (contents: string, mime: string) => {
  return `data:${mime};base64,${Buffer.from(contents).toString('base64')}`;
};

export const isBrowser = () => typeof window !== 'undefined';
