import type { AppRootState } from '@/redux/store';

const selectConsent = (state: AppRootState) => state.consent;
export const selectReviewCompleted = (state: AppRootState) =>
  state.consent.reviewCompleted;
export const selectCookiesConsent = (state: AppRootState) =>
  state.consent.cookies;
export const selectPermissionForLocation = (state: AppRootState) =>
  state.consent.permission.location;
export const selectPermissionForNotification = (state: AppRootState) =>
  state.consent.permission.notification;

export default selectConsent;
