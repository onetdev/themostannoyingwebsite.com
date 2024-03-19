import { styled } from 'styled-components';

import { actions as preferenceActions } from '@/redux/slices/preference';
import { useAppDispatch } from '@/redux/hooks';
import { cssVars } from '@/styles/theme';
import { ColorScheme } from '@/hooks/useSystemColorScheme';
import useColorScheme from '@/hooks/useUserColorScheme';

type Props = {
  className?: string;
};

const SelectorOption = styled.span`
  flex-grow: 1;
  z-index: 1;
  cursor: pointer;
  text-align: center;
`;
const InDarkMode = styled(SelectorOption)``;
const InDayMode = styled(SelectorOption)``;
const Toggler = styled.div<{ $isDarkMode: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 60px;
  height: 20px;
  user-select: none;
  border: 1px solid ${cssVars.color.secondary};
  border-radius: 10px;
  &:before {
    content: '';
    position: absolute;
    width: 50%;
    background: ${cssVars.color.secondary};
    height: 100%;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    transform: translateX(${(props) => (props.$isDarkMode ? '0' : '100%')});
  }
`;

const DarkModeToggle = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const toggleDarkMode = () => {
    let next: ColorScheme;
    switch (colorScheme) {
      case 'dark':
        next = 'light';
        break;
      case 'light':
        next = 'dark';
        break;
    }
    dispatch(preferenceActions.setColorScheme(next));
  };

  return (
    <Toggler
      className={className}
      onClick={toggleDarkMode}
      $isDarkMode={colorScheme === 'dark'}>
      <InDayMode role="img" aria-label="sun">
        ☀️
      </InDayMode>
      <InDarkMode role="img" aria-label="moon">
        🌙
      </InDarkMode>
    </Toggler>
  );
};

export default DarkModeToggle;
