declare global {
  type AppTheme = 'light' | 'dark';

  // biome-ignore lint/suspicious/noExplicitAny: Just to avoid any in other places, we use this explicit alias.
  type TypeNarrowArg = any;

  type CaptchaFormInputs = {
    captcha: string;
  };

  export type PagedList<T> = {
    items: T[];
    total: number;
    take: number;
    skip: number;
  };

  type NextPageParams = {
    locale: string;
  };

  type NextPageProps<T extends {} = object> = {
    params: Promise<T & NextPageParams>;
  };

  type UnknownEventPayload = unknown;

  type EventBusEvent<T = UnknownEventPayload> = {
    type: string;
    payload?: T;
    timestamp: number;
  };

  type EventBusListener<T = UnknownEventPayload> = (
    event: EventBusEvent<T>,
  ) => void;

  interface Window {
    maw?: {
      eventBust?: {
        dispatch: <T = UnknownEventPayload>(type: string, payload?: T) => void;
        subscribe: <T = UnknownEventPayload>(
          type: string,
          listener: EventBusListener<T>,
        ) => () => void;
      };
    };
  }
}
