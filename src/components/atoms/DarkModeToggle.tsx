import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

export type DarkModeToggleProps = {
  className?: string;
};

const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      suppressHydrationWarning
      data-dark={(resolvedTheme === 'dark' || !resolvedTheme).toString()}
      className={`relative flex h-7 w-16 translate-x-0 select-none justify-between rounded-full border border-secondary before:block ${className} before:absolute before:inset-y-0 before:h-full before:w-1/2 before:rounded-full before:bg-secondary before:duration-100 before:ease-in-out before:data-[dark=true]:translate-x-full`}
      onClick={toggleDarkMode}>
      <SelectOption role="img" aria-label={t('themeSwitch.lightMode')}>
        ☀️
      </SelectOption>
      <SelectOption role="img" aria-label={t('themeSwitch.darkMode')}>
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
    <span className="z-10 grow cursor-pointer text-center text-base" {...rest}>
      {children}
    </span>
  );
};

export default DarkModeToggle;
