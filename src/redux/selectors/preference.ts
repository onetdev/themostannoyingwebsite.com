import type { AppState } from '@/redux/store';

const selectPreference = (state: AppState) => state.preference;
export const selectDarkMode = (state: AppState) => state.preference.isDarkMode;
export const selectEnableSound = (state: AppState) =>
  state.preference.enableSound;
export const selectEnableFlashing = (state: AppState) =>
  state.preference.enableFlashing;
export const selectAdultFilter = (state: AppState) =>
  state.preference.adultFilter;

export default selectPreference;
