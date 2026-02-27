export type ObstructorEvent =
  | {
      type: 'DEAD_PIXEL_CLICK_ATTEMPT';
      payload?: never;
    }
  | {
      type: 'MAZE_STEP';
      payload: {
        passedSpecialCell: boolean;
      };
    }
  | {
      type: 'BOUNCY_LOGO_BOUNCE';
      payload: {
        isPerfectCorner: boolean;
      };
    };
