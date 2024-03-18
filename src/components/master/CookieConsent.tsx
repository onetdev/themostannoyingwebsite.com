import Link from 'next/link';
import { styled } from 'styled-components';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setReviewCompleted } from '@/redux/slices/consent';
import { cssVars, ThemeProps } from '@/styles/theme';
import { selectReviewCompleted } from '@/redux/selectors/consent';

const Wrap = styled.div<{ theme: ThemeProps }>`
  position: sticky;
  bottom: -10px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 -2px 5px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid ${cssVars.color.tertiary};
  border-radius: ${cssVars.spacing.gap};
  padding: ${cssVars.spacing.gap} ${cssVars.spacing.gap2x};
`;
const Disclaimer = styled.p``;
const Actions = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: ${cssVars.spacing.gap};
`;

const CookieBar = () => {
  const dispatch = useAppDispatch();
  const completed = useAppSelector(selectReviewCompleted);

  const close = () => {
    dispatch(setReviewCompleted(true));
  };

  return (
    <>
      {!completed && (
        <Wrap>
          <Disclaimer>
            This website uses cookies to ensure you get the best experience on
            our website. It&apos;s also a joke so many of the features are buggy
            or doens&apos;t even work on purpose. You can customize your
            experience and cookie settings in the settings menu.
          </Disclaimer>
          <Actions>
            <Link href="/settings" passHref>
              Settings
            </Link>
            <button onClick={close}>Got it!</button>
          </Actions>
        </Wrap>
      )}
    </>
  );
};

export default CookieBar;
