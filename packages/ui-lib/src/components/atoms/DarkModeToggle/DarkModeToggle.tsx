import { FunctionComponent } from 'react';

import { SelectOption } from './SelectOption';
import { Icon } from '../Icon';

export type DarkModeToggleSize = 'md' | 'lg';
export type DarkModeToggleProps = {
  className?: string;
  size?: DarkModeToggleSize;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  text: {
    lightMode: string;
    darkMode: string;
  };
};

const resolveSize = (size: DarkModeToggleSize) => {
  let className: string;
  switch (size) {
    case 'lg':
      className = 'h-7 w-16 md:h-10 md:w-20';
      break;
    default:
    case 'md':
      className = 'h-7 w-16';
      break;
  }

  return className;
};

export const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({
  className,
  size = 'md',
  text,
  resolvedTheme,
  setTheme,
}) => {
  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const sizeClass = resolveSize(size);
  const isDark = resolvedTheme === 'dark' || !resolvedTheme;

  return (
    <button
      tabIndex={0}
      suppressHydrationWarning
      data-dark={isDark.toString()}
      className={`group border-border-primary bg-surface-alt relative flex justify-between rounded-full border select-none ${sizeClass} ${className}`}
      onClick={toggleDarkMode}>
      <div className="bg-primary absolute inset-y-0 block h-full w-1/2 translate-x-0 rounded-full transition duration-100 ease-in-out group-data-[dark=true]:translate-x-full" />
      <SelectOption role="img" aria-label={text.lightMode} isSelected={!isDark}>
        <Icon icon="sun" />
      </SelectOption>
      <SelectOption role="img" aria-label={text.darkMode} isSelected={isDark}>
        <Icon icon="moon" />
      </SelectOption>
    </button>
  );
};
