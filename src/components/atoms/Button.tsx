import { styled } from 'styled-components';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';

import cssVars from '@/styles/css_vars';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const Button: FunctionComponent<Props> = ({
  variant = 'primary',
  children,
  onClick,
  disabled,
  ...rest
}) => {
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
      $background={color.background}
      $backgroundAlt={color.backgroundAlt}
      $textColor={color.textColor}
      onClick={onClick}
      disabled={disabled}
      {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $background: string;
  $backgroundAlt: string;
  $textColor: string;
}>`
  cursor: pointer;
  background: ${(props) => props.$background};
  color: ${(props) => props.$textColor};
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background: ${(props) => props.$backgroundAlt};
  }
  &:disabled {
    filter: grayscale(100%);
    cursor: default;
  }
`;

export default Button;
