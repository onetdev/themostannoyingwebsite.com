import { cva, type VariantProps } from 'class-variance-authority';
import { FunctionComponent } from 'react';

import { cn } from '../../../utils';
import { Icon } from '../Icon';

const darkModeToggleVariants = cva(
  'group border-border-input bg-surface-alt relative flex justify-between rounded-full border transition-all select-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        md: 'h-7 w-16',
        lg: 'h-7 w-16 md:h-9 md:w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type DarkModeToggleProps = VariantProps<
  typeof darkModeToggleVariants
> & {
  className?: string;
  resolvedTheme?: 'light' | 'dark' | string;
  setTheme: (theme: string) => void;
  text: {
    lightMode: string;
    darkMode: string;
  };
};

export const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({
  className,
  size = 'md',
  text,
  resolvedTheme,
  setTheme,
}) => {
  const isDark = resolvedTheme === 'dark';

  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? text.darkMode : text.lightMode}
      suppressHydrationWarning
      data-dark={isDark.toString()}
      className={cn(darkModeToggleVariants({ size, className }))}
      onClick={toggleDarkMode}>
      <span
        suppressHydrationWarning
        className={cn(
          'bg-primary absolute inset-y-0 left-0 block h-full w-1/2 rounded-full transition-transform duration-200 ease-in-out',
          isDark ? 'translate-x-full' : 'translate-x-0',
        )}
      />
      <div
        suppressHydrationWarning
        className={cn(
          'text-on-surface z-10 flex flex-1 items-center justify-center transition-colors duration-200',
          !isDark && 'text-on-primary',
        )}>
        <Icon icon="sun" />
      </div>
      <div
        suppressHydrationWarning
        className={cn(
          'text-on-surface z-10 flex flex-1 items-center justify-center transition-colors duration-200',
          isDark && 'text-on-primary',
        )}>
        <Icon icon="moon" />
      </div>
    </button>
  );
};
