import {
  faBars,
  faCommentDots,
  faGear,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faPaperPlane,
  faPlayCircle,
  faShare,
  faTags,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';

const iconMap = {
  close: faTimes,
  commentDots: faCommentDots,
  login: faUser,
  mapMarker: faMapMarkerAlt,
  menu: faBars,
  play: faPlayCircle,
  search: faMagnifyingGlass,
  send: faPaperPlane,
  settings: faGear,
  share: faShare,
  tags: faTags,
};
export type IconAliaseKey = keyof typeof iconMap;

const iconSizeMap: Record<string, string> = {
  xs: 'size-1',
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
  '2xl': 'size-6',
  '3xl': 'size-8',
  '4xl': 'size-9',
  '5xl': 'size-12',
};
export type IconSize = keyof typeof iconSizeMap;

export type IconProps = Omit<
  FontAwesomeIconProps,
  'icon' | 'className' | 'size'
> & {
  icon: IconAliaseKey;
  size?: IconSize;
  className?: string;
};

const Icon: FunctionComponent<IconProps> = ({
  icon,
  size = 'md',
  className,
  ...rest
}) => {
  const resolvedIcon = iconMap[icon];
  const resolvedSize = iconSizeMap[size] || iconSizeMap.md;

  return (
    <FontAwesomeIcon
      icon={resolvedIcon}
      className={`${resolvedSize} ${className}`}
      {...rest}
    />
  );
};

export default Icon;
