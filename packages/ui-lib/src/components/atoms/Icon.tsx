import {
  faBitcoin,
  faEthereum,
  faFacebook,
  faPaypal,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
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
  faCircleHalfStroke,
  faCircleInfo,
  faCoins,
  faCommentDots,
  faDisplay,
  faEnvelope,
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
  bitcoin: faBitcoin,
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
  email: faEnvelope,
  ethereum: faEthereum,
  facebook: faFacebook,
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
  paypal: faPaypal,
  play: faPlayCircle,
  rotate: faRotateRight,
  search: faMagnifyingGlass,
  send: faPaperPlane,
  settings: faGear,
  share: faArrowUpRightFromSquare,
  spinner: faSpinner,
  sun: faSun,
  system: faDisplay,
  tags: faTags,
  theme: faCircleHalfStroke,
  trophy: faTrophy,
  utensils: faUtensils,
  xTwitter: faXTwitter,
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
