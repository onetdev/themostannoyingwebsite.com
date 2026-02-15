import {
  faArrowUpRightFromSquare,
  faBars,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleExclamation,
  faCircleInfo,
  faCommentDots,
  faEyeDropper,
  faGear,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faMoon,
  faPaperPlane,
  faPlayCircle,
  faSun,
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
  check: faCheck,
  chevronDown: faChevronDown,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
  circle: faCircle,
  close: faTimes,
  colorPicker: faEyeDropper,
  commentDots: faCommentDots,
  failed: faCircleExclamation,
  info: faCircleInfo,
  login: faUser,
  mapMarker: faMapMarkerAlt,
  menu: faBars,
  moon: faMoon,
  play: faPlayCircle,
  search: faMagnifyingGlass,
  send: faPaperPlane,
  settings: faGear,
  share: faArrowUpRightFromSquare,
  sun: faSun,
  tags: faTags,
};
export type IconAliaseKey = keyof typeof iconMap;

export type IconProps = Omit<
  FontAwesomeIconProps,
  'icon' | 'className' | 'size'
> & {
  icon: IconAliaseKey;
  className?: string;
};

export function Icon({ icon, className, ...rest }: IconProps) {
  const resolvedIcon = iconMap[icon];

  return (
    <FontAwesomeIcon
      icon={resolvedIcon}
      className={`${className ?? ''}`}
      {...rest}
    />
  );
}
