import { styled } from 'styled-components';

import { ClearListStyle } from '@/utils/styles';
import { cssVars } from '@/styles/theme';

export const Menu = styled.ul`
  ${ClearListStyle}
  display: flex;
  flex-wrap: wrap;
  margin: ${cssVars.spacing.gap} 0;
  gap: ${cssVars.spacing.gap};
  font-size: ${cssVars.fontSize.large};
`;
export const MenuItem = styled.li``;
