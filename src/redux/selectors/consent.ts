import type { AppRootState } from '@/redux/store';

const selectConsent = (state: AppRootState) => state.consent;
export const selectReviewCompleted = (state: AppRootState) =>
  state.consent.reviewCompleted;
export const selectAllowCookies = (state: AppRootState) =>
  state.consent.allowCookies;
export const selectAllowLocation = (state: AppRootState) =>
  state.consent.allowLocation;
export const selectAllowNotification = (state: AppRootState) =>
  state.consent.allowNotification;

export default selectConsent;
