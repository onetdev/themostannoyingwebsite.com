import { styled } from 'styled-components';
import { FunctionComponent } from 'react';

import { ThemeColors } from '@/types';

// SVG generated by https://pattern.monster/
const Container = styled.div<{
  width: number;
  height: number;
  theme: ThemeColors;
}>`
  position: relative;
  background-image: ${({ theme }) => generateBackground(theme.secondary)};
  background-repeat: repeat;
  padding-bottom: ${({ width, height }) => `${(height / width) * 100}%`};

  &::after {
    position: absolute;
    content: '';
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    background: radial-gradient(transparent, var(--color-primary));
    pointer-events: none;
    mix-blend-mode: saturation;
  }
`;

const generateBackground = (color: string) => {
  return `url("data:image/svg+xml,<svg id='patternId' width='70' height='8' xmlns='http://www.w3.org/2000/svg'><path d='M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002' stroke-width='1' stroke='${color}' fill='none'/></svg>")`;
};

type Props = {
  width: number;
  height: number;
};

const CoverPlaceholder: FunctionComponent<Props> = ({ width, height }) => {
  return <Container width={width} height={height} />;
};

export default CoverPlaceholder;
