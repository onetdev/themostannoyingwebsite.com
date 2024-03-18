import type { AppRootState } from '@/redux/store';

const selectPreference = (state: AppRootState) => state.preference;
export const selectDarkMode = (state: AppRootState) =>
  state.preference.isDarkMode;
export const selectEnableSound = (state: AppRootState) =>
  state.preference.enableSound;
export const selectEnableFlashing = (state: AppRootState) =>
  state.preference.enableFlashing;
export const selectAdultFilter = (state: AppRootState) =>
  state.preference.adultFilter;

export default selectPreference;
