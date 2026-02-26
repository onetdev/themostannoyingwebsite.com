export const DOCUMENT_EVENT_SEARCH = 'DocumentEventSearch';
export type DocumentEventSearchDetails = {
  query: string;
};

declare global {
  type AppTheme = 'light' | 'dark';

  // biome-ignore lint/suspicious/noExplicitAny: Just to avoid any in other places, we use this explicit alias.
  type TypeNarrowArg = any;

  type CaptchaFormInputs = {
    captcha: string;
  };

  interface DocumentEventMap {
    [DOCUMENT_EVENT_SEARCH]: CustomEvent<DocumentEventSearchDetails>;
  }

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
}
