import { styled } from 'styled-components';

import { cssVars } from '@/styles/theme';

type Props = {
  variant: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  // TODO: Inherit these properties from the actual component
  // so that the rest spread works.
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

const StyledButton = styled.button<{
  background: string;
  backgroundAlt: string;
  textColor: string;
}>`
  cursor: pointer;
  background: ${(props) => props.background};
  color: ${(props) => props.textColor};
  transition: background 0.1s ease-in-out;
  &:hover {
    background: ${(props) => props.backgroundAlt};
  }
  &:disabled {
    filter: grayscale(100%);
    cursor: default;
  }
`;

const Button = ({ variant, children, onClick, disabled, ...rest }: Props) => {
  let color;
  switch (variant) {
    case 'secondary':
      color = {
        background: cssVars.color.secondary,
        backgroundAlt: cssVars.color.secondaryAlt,
        textColor: cssVars.color.onSecondary,
      };
      break;
    case 'tertiary':
      color = {
        background: cssVars.color.tertiary,
        backgroundAlt: cssVars.color.tertiaryAlt,
        textColor: cssVars.color.onTertiary,
      };
      break;
    case 'primary':
    default:
      color = {
        background: cssVars.color.primary,
        backgroundAlt: cssVars.color.primaryAlt,
        textColor: cssVars.color.onPrimary,
      };
      break;
  }

  return (
    <StyledButton
      background={color.background}
      backgroundAlt={color.backgroundAlt}
      textColor={color.textColor}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
