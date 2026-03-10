import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export function TestimonialCarousel() {
  const messages = useMessages() as AppTranslationShape;
  const testimonials = messages.marketing.onlySpams.testimonials.items;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-4xl mx-auto py-16">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className="pl-4 basis-[70%] md:basis-[60%]">
              <motion.div
                animate={{
                  scale: current === i ? 1 : 0.92,
                  opacity: current === i ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      <Badge>Verified</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 space-y-4">
                    <p className="text-muted-foreground">"{t.comment}"</p>

                    <p className="font-semibold">— {t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Pagination dots */}

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === i ? 'bg-primary w-6' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
