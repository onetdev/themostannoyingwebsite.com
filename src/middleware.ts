import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';

import nextI18nConfig from '@/root/i18n.config';

export function middleware(request: NextRequest) {
  return i18nRouter(request, nextI18nConfig);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
