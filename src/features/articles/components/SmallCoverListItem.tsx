import Link from 'next/link';
import Image from 'next/image';
import { styled } from 'styled-components';

import { ArticleCore } from '@/types';
import cssVars from '@/styles/css_vars';

import CoverPlaceholder from './CoverPlaceholder';

const Title = styled.h3`
  margin: ${cssVars.spacing.gap} 0;
`;
const Intro = styled.p`
  margin: 0;
  margin-bottom: ${cssVars.spacing.gap};
`;
const CoverImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

type Props = {
  article: ArticleCore;
};

const SmallCoverListItem = ({ article }: Props) => {
  return (
    <>
      <Link href={article.url} passHref>
        {!article.coverImage && <CoverPlaceholder width={1920} height={1200} />}
        {article.coverImage && (
          <CoverImage
            src={article.coverImage}
            alt="Cover image"
            width="1920"
            height="1200"
          />
        )}
        <Title>{article.title}</Title>
        <Intro>{article.intro}</Intro>
      </Link>
    </>
  );
};

export default SmallCoverListItem;
