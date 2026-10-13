import { cn } from '../../utils';
import { Icon, type IconProps } from './Icon';

export type SpinnerProps = Omit<IconProps, 'icon'>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Icon
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      data-slot="spinner"
      icon="spinner"
      role="status"
      {...props}
    />
  );
}
