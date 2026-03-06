import type { Page } from '@playwright/test';
import { getFooter } from './Footer';
import { getHeader } from './Header';
import { getToast } from './Toast';

export function getSharedLocators(page: Page) {
  const header = getHeader(page);
  const footer = getFooter(page);
  const toast = getToast(page);

  return {
    ...header,
    ...footer,
    toast,
  };
}
