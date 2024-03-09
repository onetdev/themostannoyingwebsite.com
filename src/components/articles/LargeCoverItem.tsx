import { styled } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { ArticleCore } from '@/types';
import { cssVars } from '@/styles/theme';

import CoverPlaceholder from './CoverPlaceholder';

const Anchor = styled(Link)`
  display: block;
  position: relative;
`;
const OverlayLabels = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: ${cssVars.spacing.gap};
  bottom: 0;
  right: 0;
  width: 100%;
`;
const Title = styled.h2`
  padding: 0 ${cssVars.spacing.gap};
  margin: 0 0 ${cssVars.spacing.gap} 0;
  font-size: ${cssVars.fontSize.title};
  background: ${cssVars.color.primary};
  color: ${cssVars.color.onPrimary};
`;
const Intro = styled.p`
  margin: 0;
  font-size: ${cssVars.fontSize.large};
  background: ${cssVars.color.secondary};
  color: ${cssVars.color.onSecondary};
`;

type Props = {
  article: ArticleCore;
};

const LargeCoverItem = ({ article }: Props) => {
  return (
    <>
      <Anchor href={article.url} passHref>
        {!article.coverImage && <CoverPlaceholder width={1920} height={1200} />}
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt="Cover image"
            layout="responsive"
            width="1920"
            height="1200"
          />
        )}
        <OverlayLabels>
          <Title>{article.title}</Title>
          <Intro>{article.intro}</Intro>
        </OverlayLabels>
      </Anchor>
    </>
  );
};

export default LargeCoverItem;
