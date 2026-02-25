import {
  faArrowUpRightFromSquare,
  faBars,
  faCheck,
  faCheckCircle,
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
  faInfoCircle,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faMoon,
  faPaperPlane,
  faPlayCircle,
  faSpinner,
  faSun,
  faTags,
  faTimes,
  faTriangleExclamation,
  faUser,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const iconMap = {
  alertTriangle: faTriangleExclamation,
  check: faCheck,
  checkCircle: faCheckCircle,
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
  infoCircle: faInfoCircle,
  login: faUser,
  mapMarker: faMapMarkerAlt,
  menu: faBars,
  moon: faMoon,
  play: faPlayCircle,
  search: faMagnifyingGlass,
  send: faPaperPlane,
  settings: faGear,
  share: faArrowUpRightFromSquare,
  spinner: faSpinner,
  sun: faSun,
  tags: faTags,
  xmarkCircle: faXmarkCircle,
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
