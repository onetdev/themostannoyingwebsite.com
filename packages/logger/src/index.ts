import pino from 'pino';

export const getLogger = () => {
  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  });

  return logger;
};

export const useLogger = () => {
  const logger = pino({});

  return logger;
};
