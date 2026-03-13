'use client';

import { useInjection } from '@/core/di/react/ReactDi';
import { CoreSymbols } from '@/core/di/symbols';
import type { HttpClient } from '../HttpClient';

export function useHttpClient(): HttpClient {
  return useInjection<HttpClient>(CoreSymbols.HttpClient);
}
