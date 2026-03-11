import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Card, CardContent } from './Card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

export interface PeekCarouselProps {
  labelTemplate: string;
}

export function PeekCarousel({
  labelTemplate = 'Card {index}',
}: PeekCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <CarouselItem
            key={i}
            className="pl-4 basis-[70%] md:basis-[50%] lg:basis-[40%]"
          >
            <Card>
              <CardContent className="h-40 flex items-center justify-center">
                {labelTemplate.replace('{index}', i.toString())}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export interface CarouselDotIndicatorProps extends ComponentProps<'div'> {
  api: CarouselApi;
  current: number;
  count: number;
}

export function CarouselDotIndicator({
  className,
  api,
  current,
  count,
}: CarouselDotIndicatorProps) {
  return (
    <div className={clsx('flex justify-center gap-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          type="button"
          key={i}
          onClick={() => api?.scrollTo(i)}
          className={clsx(
            `h-2 w-2 rounded-full transition-all`,
            current === i ? 'bg-primary w-6' : 'bg-muted',
          )}
        />
      ))}
    </div>
  );
}
