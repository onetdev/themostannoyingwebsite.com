import {
  ThunkAction,
  Action,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import storage from '@photobot/reduxjs-toolkit-persist/lib/storage';
import {
  persistReducer,
  persistStore,
} from '@photobot/reduxjs-toolkit-persist/lib';
import { type PersistConfig } from '@photobot/reduxjs-toolkit-persist/src/types';
import autoMergeLevel2 from '@photobot/reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';

import preferenceReducer from '@/redux/slices/preference';
import consentReducer from '@/redux/slices/consent';
import experienceReducer from '@/redux/slices/experience';
import runtimeReducer from '@/redux/slices/runtime';

export const rootReducer = combineReducers({
  preference: preferenceReducer,
  consent: consentReducer,
  experience: experienceReducer,
  runtime: runtimeReducer,
});

const persistConfig: PersistConfig<RootState> = {
  version: 2,
  key: 'root',
  storage,
  whitelist: ['consent', 'experience', 'preference'],
  blacklist: ['runtime'],
  debug: process.env.NODE_ENV !== 'production',
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

export type PersistedStoreType = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
