'use client';

import { useEffect, useState } from 'react';

type SlotDigitProps = {
  value: number;
  delay?: number;
};

export function SlotDigit({ value, delay = 0 }: SlotDigitProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    // Start spinning animation
    let spinCount = 0;
    const maxSpins = 20 + Math.floor(Math.random() * 10);

    const spinInterval = setInterval(() => {
      setCurrentValue((prev) => (prev + 1) % 10);
      spinCount++;

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        // Slow down to final value
        setTimeout(() => {
          setCurrentValue(value);
          setIsSpinning(false);
        }, 100);
      }
    }, 50);

    const timeoutId = setTimeout(() => {
      // This ensures we don't start immediately
    }, delay);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return (
    <div className="bg-surface shadow-inner-alt relative h-12 w-8 overflow-hidden rounded text-3xl font-bold">
      <div
        className={`flex flex-col items-center justify-center transition-transform ${
          isSpinning ? 'duration-50' : 'duration-300 ease-out'
        }`}
        style={{
          transform: `translateY(-${currentValue * 3}rem)`,
        }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
          (num, idx) => (
            <div
              key={idx}
              className="flex h-12 w-8 items-center justify-center transition-colors duration-500">
              {num}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
