import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps, toast } from 'sonner';

import { Icon } from '../atoms';

const Toaster = ({ theme = 'system', ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
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
