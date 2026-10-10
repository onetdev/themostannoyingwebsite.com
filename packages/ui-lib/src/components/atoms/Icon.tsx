import {
  faArrowUp,
  faArrowUpRightFromSquare,
  faBars,
  faBrain,
  faBug,
  faCheck,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleExclamation,
  faCircleInfo,
  faCoins,
  faCommentDots,
  faEyeDropper,
  faFire,
  faGear,
  faHandHoldingDollar,
  faHeart,
  faInfoCircle,
  faLock,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faMoon,
  faMugHot,
  faPaperPlane,
  faPlayCircle,
  faRotateRight,
  faSpinner,
  faSun,
  faTags,
  faTimes,
  faTriangleExclamation,
  faTrophy,
  faUser,
  faUtensils,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const iconMap = {
  alertTriangle: faTriangleExclamation,
  arrowUp: faArrowUp,
  brain: faBrain,
  bug: faBug,
  check: faCheck,
  checkCircle: faCheckCircle,
  chevronDown: faChevronDown,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
  circle: faCircle,
  close: faTimes,
  coins: faCoins,
  colorPicker: faEyeDropper,
  commentDots: faCommentDots,
  failed: faCircleExclamation,
  fire: faFire,
  handHoldingDollar: faHandHoldingDollar,
  heart: faHeart,
  info: faCircleInfo,
  infoCircle: faInfoCircle,
  lock: faLock,
  login: faUser,
  mapMarker: faMapMarkerAlt,
  menu: faBars,
  moon: faMoon,
  mugHot: faMugHot,
  play: faPlayCircle,
  rotate: faRotateRight,
  search: faMagnifyingGlass,
  send: faPaperPlane,
  settings: faGear,
  share: faArrowUpRightFromSquare,
  spinner: faSpinner,
  sun: faSun,
  tags: faTags,
  trophy: faTrophy,
  utensils: faUtensils,
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
