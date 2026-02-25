import { useTheme } from 'next-themes';
import { CSSProperties } from 'react';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

import { Icon } from '../atoms';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <Icon icon="checkCircle" className="text-base" />,
        info: <Icon icon="infoCircle" className="text-base" />,
        warning: <Icon icon="alertTriangle" className="text-base" />,
        error: <Icon icon="xmarkCircle" className="text-base" />,
        loading: <Icon icon="spinner" className="animate-spin text-base" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster, toast };
