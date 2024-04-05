import { styled } from 'styled-components';

import { ClearListStyle } from '@/styles/utils';
import cssVars from '@/styles/css_vars';

export const Menu = styled.ul`
  ${ClearListStyle}
  display: flex;
  flex-wrap: wrap;
  margin: ${cssVars.spacing.gap} 0;
  gap: ${cssVars.spacing.gap};
  font-size: ${cssVars.fontSize.large};
`;
export const MenuItem = styled.li``;
