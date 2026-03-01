export type ObstructorEvent = {
  'dead-pixel:clicked': never;
  'screensaver:maze:stepped': {
    passedSpecialCell: boolean;
  };
  'screensaver:bouncy-logo:bounced': {
    isPerfectCorner: boolean;
  };
};
