import { FunctionComponent } from 'react';

export type DarkModeToggleSize = 'md' | 'lg';
export type DarkModeToggleProps = {
  className?: string;
  size?: DarkModeToggleSize;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  text: {
    lightMode: string;
    darkMode: string;
  }
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

const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({
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

  return (
    <div
      suppressHydrationWarning
      data-dark={(resolvedTheme === 'dark' || !resolvedTheme).toString()}
      className={`relative flex translate-x-0 select-none justify-between rounded-full border border-secondary before:block ${sizeClass} ${className} before:absolute before:inset-y-0 before:h-full before:w-1/2 before:rounded-full before:bg-secondary before:duration-100 before:ease-in-out before:data-[dark=true]:translate-x-full`}
      onClick={toggleDarkMode}>
      <SelectOption
        role="img"
        aria-label={text.lightMode}>
        ☀️
      </SelectOption>
      <SelectOption
        role="img"
        aria-label={text.darkMode}>
        🌙
      </SelectOption>
    </div>
  );
};

const SelectOption: FunctionComponent<JSXProxyProps<'span'>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      className="z-10 flex grow cursor-pointer items-center justify-center text-center text-base"
      {...rest}>
      <span>{children}</span>
    </div>
  );
};

export default DarkModeToggle;
