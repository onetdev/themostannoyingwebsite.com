'use client';

import { useEffect } from 'react';

import { useRuntimeStore } from '@/stores';

export const useTouchScreenListener = () => {
  const setIsTouch = useRuntimeStore((state) => state.setIsTouch);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, [setIsTouch]);
};
