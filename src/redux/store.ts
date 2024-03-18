import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';
import { type PersistConfig } from 'reduxjs-toolkit-persist/lib/types';

import preferenceReducer from '@/redux/slices/preference';
import consentReducer from '@/redux/slices/consent';
import experienceReducer from '@/redux/slices/experience';
import runtimeReducer from '@/redux/slices/runtime';

// Types are a bit odd with persitance store 🤔
type RootReducerType = typeof rootReducers;
type RootReducerReturnType = ReturnType<typeof rootReducers>;

export type PersistedStoreType = typeof store;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig: PersistConfig<RootReducerReturnType> = {
  version: 2,
  key: 'root',
  storage,
  whitelist: ['consent', 'experience', 'preference'],
  blacklist: ['runtime'],
  debug: process.env.NODE_ENV !== 'production',
  stateReconciler: autoMergeLevel2,
};

export const rootReducers = combineReducers({
  preference: preferenceReducer,
  consent: consentReducer,
  experience: experienceReducer,
  runtime: runtimeReducer,
});

const _persistedReducer = persistReducer(
  persistConfig,
  rootReducers,
) as RootReducerType;

export const store = configureStore({
  reducer: _persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: undefined,
    }),
});

export const persistor = persistStore(store);
