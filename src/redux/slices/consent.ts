import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getLocationPermissionState,
  getNotificationPermissionState,
} from '@/utils/permission';

export interface ConsentState {
  reviewCompleted: boolean;
  cookies: {
    essential: boolean;
  };
  permission: {
    location?: PermissionStatus;
    notification?: NotificationPermission;
  };
}

const initialState: ConsentState = {
  reviewCompleted: false,
  cookies: {
    essential: true,
  },
  permission: {},
};

export const syncLocationPermission = createAsyncThunk(
  'consent/syncLocationPermission',
  () => getLocationPermissionState(),
);

export const syncPermissions = createAsyncThunk(
  'consent/syncPermissions',
  async (): Promise<ConsentState['permission']> => {
    return {
      location: await getLocationPermissionState(),
      notification: getNotificationPermissionState(),
    };
  },
);

export const consentSlice = createSlice({
  name: 'consent',
  initialState,
  reducers: {
    setReviewCompleted: (state, action: PayloadAction<boolean>) => {
      state.reviewCompleted = action.payload;
    },
    setCookieConsent: (
      state,
      action: PayloadAction<Omit<ConsentState['cookies'], 'essential'>>,
    ) => {
      state.cookies = {
        ...action.payload,
        essential: state.cookies.essential,
      };
    },
    syncNotificationPermission: (state) => {
      state.permission.notification = getNotificationPermissionState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncLocationPermission.pending, (state) => {
        state.permission.location = undefined;
      })
      .addCase(syncLocationPermission.fulfilled, (state, action) => {
        state.permission.location = action.payload;
      })
      .addCase(syncLocationPermission.rejected, (state) => {
        state.permission.location = undefined;
      });

    builder
      .addCase(syncPermissions.pending, (state) => {
        state.permission = {};
      })
      .addCase(syncPermissions.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(syncPermissions.rejected, (state) => {
        state.permission = {};
      });
  },
});

export const actions = consentSlice.actions;
export default consentSlice.reducer;
