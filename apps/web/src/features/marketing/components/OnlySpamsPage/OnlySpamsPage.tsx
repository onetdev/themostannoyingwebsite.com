'use client';

import { Button } from '@maw/ui-lib';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { emit } from '@/core/events/event-bus';
import { EmailSampleCarousel } from './EmailSampleCarousel';
import { ParallaxDecorationBlocks } from './ParallaxDecorationBlocks';
import { TestimonialCarousel } from './TestimonialCarousel';

export function OnlySpamsPage() {
  const t = useTranslations();

  const handleSubscribe = () => {
    emit('ui:newsletter-modal:show');
  };

  return (
    <div className="flex flex-col gap-16 py-10 relative overflow-hidden">
      <ParallaxDecorationBlocks />

      <div className="max-w-3xl text-center mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/only-spams.svg"
            alt={t('marketing.onlySpams.title')}
            width={600}
            height={168}
            priority
            className="w-full max-w-lg h-auto"
          />
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('marketing.onlySpams.description')}
        </p>
      </div>

      <div className="w-full relative z-10">
        <h3 className="text-3xl font-bold mb-8 text-center">
          {t('marketing.onlySpams.samples.title')}
        </h3>
        <EmailSampleCarousel />
      </div>

      <div className="w-full relative z-10">
        <h3 className="text-3xl font-bold mb-8 text-center">
          {t('marketing.onlySpams.testimonials.title')}
        </h3>
        <TestimonialCarousel />
      </div>

      <div className="flex justify-center mt-8 relative z-10">
        <Button
          size="lg"
          className="px-12 py-8 text-xl font-bold"
          onClick={handleSubscribe}
        >
          {t('marketing.onlySpams.subscribe')}
        </Button>
      </div>
    </div>
  );
}
