import type { AppRootState } from '@/redux/store';

const selectPreference = (state: AppRootState) => state.preference;
export const selectEnableSound = (state: AppRootState) =>
  state.preference.enableSound;
export const selectEnableFlashing = (state: AppRootState) =>
  state.preference.enableFlashing;
export const selectAdultFilter = (state: AppRootState) =>
  state.preference.adultFilter;

export default selectPreference;
