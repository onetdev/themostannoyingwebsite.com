import type { Page } from '@playwright/test';

export function getChatBubble(page: Page) {
  const trigger = page.getByTestId('chat-bubble-trigger');
  const panel = page.getByTestId('chat-bubble-panel');

  return {
    trigger,
    panel,
    open: async () => {
      await trigger.click();
    },
  };
}
