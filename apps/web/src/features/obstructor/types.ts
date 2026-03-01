export type ObstructorEvent = {
  DEAD_PIXEL_CLICK_ATTEMPT: never;
  MAZE_STEP: {
    passedSpecialCell: boolean;
  };
  BOUNCY_LOGO_BOUNCE: {
    isPerfectCorner: boolean;
  };
};
