export type FormElementSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';
// Only responsible for the text size and padding

export const resolveFormElementSize = (size: FormElementSize) => {
  let className: string;

  switch (size) {
    case 'xs':
      className = 'p-1 text-xs';
      break;
    case 'sm':
      className = 'px-2 py-1 text-sm';
      break;
    case 'lg':
      className = 'px-3 py-2 text-lg';
      break;
    case 'xl':
      className = 'px-3 py-2 text-xl';
      break;
    case '2xl':
      className = 'px-3 py-2 text-2xl';
      break;
    case '3xl':
      className = 'px-3 py-2 text-3xl';
      break;
    case '4xl':
      className = 'px-3 py-2 text-4xl';
      break;
    case 'md':
    default:
      className = 'px-3 py-2 text-base';
      break;
  }
  return className;
};
