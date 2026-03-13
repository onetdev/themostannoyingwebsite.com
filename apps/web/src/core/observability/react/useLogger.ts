import { getLogger } from '@maw/logger';
import { useMemo } from 'react';

export const useLogger = (subLogger?: string) => {
  const logger = useMemo(() => {
    if (subLogger) {
      return getLogger().getSubLogger({ name: subLogger });
    }
    return getLogger();
  }, [subLogger]);

  return logger;
};
