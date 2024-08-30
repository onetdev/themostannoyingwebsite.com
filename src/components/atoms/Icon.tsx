import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faMapMarkerAlt,
  faPaperPlane,
  faPlayCircle,
  faTags,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from 'react';

type IconAliases =
  | 'faCommentDots'
  | 'faMapMarkerAlt'
  | 'faPaperPlane'
  | 'faPlayCircle'
  | 'faTags'
  | 'faTimes';
type Props = Omit<FontAwesomeIconProps, 'icon'> & {
  icon: IconAliases;
};

const resolve = (icon: Props['icon']) => {
  switch (icon) {
    case 'faCommentDots':
      return faCommentDots;
    case 'faMapMarkerAlt':
      return faMapMarkerAlt;
    case 'faPaperPlane':
      return faPaperPlane;
    case 'faPlayCircle':
      return faPlayCircle;
    case 'faTags':
      return faTags;
    case 'faTimes':
      return faTimes;
  }
};

const Icon: FunctionComponent<Props> = ({ icon, ...rest }) => (
  <FontAwesomeIcon icon={resolve(icon)} {...rest} />
);

export default Icon;
