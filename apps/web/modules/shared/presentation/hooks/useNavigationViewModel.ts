'use client';

import { useContext } from 'react';

import {
  NavigationViewModelContext,
  NavigationViewModelContextType,
} from '../view-models/NavigationViewModel';

export const useNavigationViewModel = (): NavigationViewModelContextType => {
  const context = useContext(NavigationViewModelContext);
  if (!context) {
    throw new Error(
      'useNavigationViewModel must be used within a NavigationViewModelProvider',
    );
  }
  return context;
};
