import type { AppState } from '@/redux/store';

const selectConsent = (state: AppState) => state.consent;
export const selectReviewCompleted = (state: AppState) =>
  state.consent.reviewCompleted;
export const selectAllowCookies = (state: AppState) =>
  state.consent.allowCookies;
export const selectAllowAnalytics = (state: AppState) =>
  state.consent.allowAnalytics;
export const selectAllowLocation = (state: AppState) =>
  state.consent.allowLocation;
export const selectAllowNotification = (state: AppState) =>
  state.consent.allowNotification;

export default selectConsent;
