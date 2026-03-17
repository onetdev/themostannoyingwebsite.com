'use client';

import { CoreSymbols } from '@/core/di/symbols';
import { useInjection } from '@/core/react';
import type { HttpClient } from '../HttpClient';

export function useHttpClient(): HttpClient {
  return useInjection<HttpClient>(CoreSymbols.HttpClient);
}
