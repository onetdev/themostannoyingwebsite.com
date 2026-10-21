import { buttonVariants } from '../atoms/Button';
import { Icon, type IconAliaseKey } from '../atoms/Icon';

export type ShareOptionProps = {
  href: string;
  icon: IconAliaseKey;
  label: string;
};

export function ShareOption({ href, icon, label }: ShareOptionProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      aria-label={label}
      className={buttonVariants({ size: 'icon', variant: 'outline' })}
      href={href}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
      title={label}
    >
      <Icon icon={icon} />
    </a>
  );
}
