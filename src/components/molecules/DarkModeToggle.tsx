import { FunctionComponent, PropsWithoutRef } from 'react';
import { useTheme } from 'next-themes';

type Props = {
  className?: string;
};

const DarkModeToggle: FunctionComponent<Props> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      suppressHydrationWarning
      data-dark={resolvedTheme === 'dark'}
      className={`relative flex h-7 w-16 translate-x-0 select-none justify-between rounded-full border border-secondary before:block ${className} before:absolute before:inset-y-0 before:h-full before:w-1/2 before:rounded-full before:bg-secondary before:duration-100 before:ease-in-out before:data-[dark=true]:translate-x-full`}
      onClick={toggleDarkMode}>
      <SelectOption role="img" aria-label="Light mode">
        ☀️
      </SelectOption>
      <SelectOption role="img" aria-label="Dark mode">
        🌙
      </SelectOption>
    </div>
  );
};

const SelectOption: FunctionComponent<
  PropsWithoutRef<JSX.IntrinsicElements['span']>
> = ({ children, ...rest }) => {
  return (
    <span className="z-10 grow cursor-pointer text-center text-base" {...rest}>
      {children}
    </span>
  );
};

export default DarkModeToggle;
