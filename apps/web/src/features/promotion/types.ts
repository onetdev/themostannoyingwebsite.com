export type PromotionEvent = {
  type: 'WHEEL_OF_FORTUNE_SPIN_COMPLETE';
  payload: {
    prize: string;
  };
};
