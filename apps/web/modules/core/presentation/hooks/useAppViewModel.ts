'use client';

import { useContext } from 'react';

import {
  AppViewModelContext,
  AppViewModelContextType,
} from '../view-models/AppViewModel';

export const useAppViewModel = (): AppViewModelContextType => {
  const context = useContext(AppViewModelContext);
  if (!context) {
    throw new Error('useCore must be used within a CoreProvider');
  }
  return context;
};
