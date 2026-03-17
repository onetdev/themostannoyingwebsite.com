import { Logger } from 'tslog';

export const getLogger = () => {
  const logger = new Logger({
    type: 'pretty',
  });

  return logger;
};
