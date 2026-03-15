'use client';

import { Button } from '@maw/ui-lib';

interface UpsellStepProps {
  onSpecialDeal: () => void;
  onNext: () => void;
}

export function UpsellStep({ onSpecialDeal, onNext }: UpsellStepProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-2xl font-bold">
        Wait! Don't go! Give us one more chance please!
      </h4>
      <p>
        We've noticed you're trying to not leave. How about our "Platinum
        Unsubscribe Protection" plan? It is only available for people who want
        to leave.
      </p>
      <p className="text-2xl font-bold py-10 px-5 rounded-2xl border-dotted border-2 border-destructive bg-destructive/10 mb-10">
        HUGE DEAL!
        <br />
        UP TO 99% OFF!!!
      </p>
      <div className="flex gap-4">
        <Button
          onClick={onSpecialDeal}
          variant="secondary"
          className="flex-1"
          size="lg"
        >
          I want the special deal
        </Button>
        <Button onClick={onSpecialDeal} className="flex-1" size="lg">
          Yes, I want to not leave
        </Button>
      </div>
      <Button
        variant="link"
        onClick={onNext}
        className="whitespace-break-spaces text-xs w-full text-center"
      >
        Despite everything, I'm still aiming to cancel my subscription. I am the
        problem, not you.
      </Button>
    </div>
  );
}
