import { Logger } from 'tslog';

export const getLogger = () => {
  const logger = new Logger({
    type: 'pretty',
  });

  return logger;
};

export const useLogger = () => {
  const logger = new Logger({
    type: 'pretty',
  });

  return logger;
};
