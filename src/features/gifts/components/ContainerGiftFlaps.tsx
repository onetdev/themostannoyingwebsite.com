import { css, styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { cssVars } from '@/styles/theme';
import flapImage from '@/public/assets/images/car-advert.jpg';

const ContainerWrap = styled.div`
  max-width: calc(${cssVars.spacing.container} + 250px);
  position: sticky;
  top: 0;
  left: calc(50% - calc(${cssVars.spacing.container} / 2) - 125px);
  width: 100%;
`;
const Gift = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  max-height: 100vh;
  overflow: hidden;
`;
const TextCommon = css`
  position: absolute;
  font-size: ${cssVars.fontSize.headline};
  color: ${cssVars.color.onPrimary};
  font-weight: bold;
  mix-blend-mode: exclusion;
`;
const LeftText = styled.div`
  ${TextCommon}
  top: 0;
  left: 70px;
  transform: rotate(-90deg) translate(-50vh);
  transform-origin: left bottom;
`;
const RightText = styled.div`
  ${TextCommon}
  top: 0;
  right: 70px;
  transform: rotate(90deg) translateX(50vh);
  transform-origin: right bottom;
`;
const IconImage = styled(Image)`
  object-fit: cover;
`;

const ContainerGiftFlaps: FunctionComponent = () => {
  return (
    <ContainerWrap>
      <Gift>
        <Link href="/super-duper" passHref>
          <IconImage
            src={flapImage}
            placeholder="blur"
            alt="Super duper car advert"
            width={1920}
            height={1200}
          />
          <LeftText>VERY CHEAP LOAN?</LeftText>
          <RightText>NO BACKGROUND CHECK?</RightText>
        </Link>
      </Gift>
    </ContainerWrap>
  );
};

export default ContainerGiftFlaps;
