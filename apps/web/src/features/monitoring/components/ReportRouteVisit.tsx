'use client';

import { useEffect } from 'react';
import { emit } from '@/core/events/event-bus';
import type { RouteAlias } from '@/schemas';

interface ReportRouteVisitProps {
  route: RouteAlias;
}

export function ReportRouteVisit({ route }: ReportRouteVisitProps) {
  useEffect(() => {
    console.log({ route, alma: 1 });
    emit('route:visit', { route });
  }, [route]);

  return null;
}
