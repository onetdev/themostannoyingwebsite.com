import type { VariantPoolItem } from '@/features/content/types';
import type marketingEnLocale from './i18n/en';

export const DI = {
  OnlySpamsService: Symbol.for('OnlySpamsService'),
};

export type MarketingI18nShape = typeof marketingEnLocale;

export interface Testimonial {
  name: string;
  comment: string;
}

/** Item shapes for the Content API pools this feature consumes. */
export type EmailSample = VariantPoolItem<'spam-samples'>;
export type NewsletterConfirmation =
  VariantPoolItem<'newsletter-confirmations'>;
export type QuizQuestionVariant = VariantPoolItem<'quiz-questions'>;

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
