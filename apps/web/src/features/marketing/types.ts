import type marketingEnLocale from './i18n/en';

export const DI = {
  OnlySpamsService: Symbol.for('OnlySpamsService'),
};

export type MarketingI18nShape = typeof marketingEnLocale;

export interface Testimonial {
  name: string;
  comment: string;
}

export interface EmailSample {
  subject: string;
  body: string;
}

export interface OnlySpamsData {
  testimonials: Testimonial[];
  samples: EmailSample[];
}

export interface OnlySpamsService {
  getData(locale: string): Promise<OnlySpamsData>;
}

declare global {
  interface AppEvents {
    'wof:spin-completed': {
      prize: string;
    };
  }
}
