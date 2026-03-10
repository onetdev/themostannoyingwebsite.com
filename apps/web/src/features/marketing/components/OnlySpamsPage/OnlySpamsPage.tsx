'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { EmailSampleCarousel } from './EmailSampleCarousel';
import { TestimonialCarousel } from './TestimonialCarousel';

export function OnlySpamsPage() {
  const t = useTranslations();

  return (
    <div className="lg:flex lg:flex-row lg:gap-10">
      <div className="lg:w-1/2">
        <h2 className="py-5">{t('marketing.onlySpams.title')}</h2>
        <p className="my-5 max-w-screen-md">
          {t('marketing.onlySpams.description')}
        </p>

        <h3 className="py-5 text-xl font-bold">
          {t('marketing.onlySpams.samples.title')}
        </h3>
        <div className="flex flex-col gap-4">
          <EmailSampleCarousel />
        </div>

      </div>

      <div className="lg:w-1/2">
        <h3 className="py-5 text-xl font-bold">
          {t('marketing.onlySpams.testimonials.title')}
        </h3>
        <div className="flex flex-col gap-6">
          <TestimonialCarousel />
        </div>
      </div>

      <div className="mt-10">
        <Button size="lg" className="w-full">
          {t('marketing.onlySpams.subscribe')}
        </Button>
      </div>
    </div>
  );
}
