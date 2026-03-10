import { Card, CardContent } from './Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

export function PeekCarousel() {
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
                Card {i}
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
