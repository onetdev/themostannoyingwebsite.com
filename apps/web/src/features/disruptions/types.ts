declare global {
  interface AppEvents {
    'context-menu:triggered': never;
    'dead-pixel:clicked': never;
    'screensaver:maze:stepped': {
      passedSpecialCell: boolean;
    };
    'screensaver:bouncy-logo:bounced': {
      isPerfectCorner: boolean;
    };
  }
}
