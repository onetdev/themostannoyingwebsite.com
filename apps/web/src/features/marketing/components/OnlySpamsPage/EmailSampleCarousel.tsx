'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@maw/ui-lib';
import { motion } from 'framer-motion';
import { useMessages } from 'next-intl';
import { useEffect, useState } from 'react';

export function EmailSampleCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const messages = useMessages() as AppTranslationShape;
  const samples = messages.marketing.onlySpams.samples.items;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-5xl mx-auto py-16">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {samples.map((email, i) => (
            <CarouselItem
              key={i}
              className="pl-4 basis-[70%] md:basis-[55%] lg:basis-[45%]"
            >
              <motion.div
                animate={{
                  scale: current === i ? 1 : 0.92,
                  opacity: current === i ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-xl transition">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <p className="font-semibold text-sm">SENDER</p>

                    <Badge variant="destructive">SPAM</Badge>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="font-medium">{email.subject}</p>

                    <p className="text-sm text-muted-foreground">
                      {email.body}
                    </p>

                    <Button variant="destructive" size="sm">
                      CLICK HERE
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* pagination dots */}

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              current === i ? 'bg-primary w-6' : 'bg-muted w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
