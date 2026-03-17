'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselDotIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@maw/ui-lib';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { EmailSample } from '../../types';
import { EmailSampleCard } from './EmailSampleCard';

export interface EmailSampleCarouselProps {
  items: EmailSample[];
}

export function EmailSampleCarousel({ items }: EmailSampleCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4" fade>
          {items.map((email, i) => (
            <CarouselItem
              key={`${email.subject}${email.body}`}
              className="pl-4 basis-[70%] md:basis-[55%] lg:basis-[45%] pb-4"
            >
              <motion.div
                animate={{
                  scale: current === i ? 1 : 0.92,
                  opacity: current === i ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                <EmailSampleCard {...email} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <CarouselDotIndicator
        api={api}
        current={current}
        count={count}
        className="mt-6"
      />
    </div>
  );
}
