import Link from 'next/link';
import { styled } from 'styled-components';

import { cssVars } from '@/styles/theme';
import { ArticleCore } from '@/types';

const Anchor = styled(Link)`
  text-decoration: none;
`;
const Title = styled.h3`
  margin: 0;
`;
const Intro = styled.p`
  margin: ${cssVars.spacing.gap} 0;
`;

type Props = {
  article: ArticleCore;
};

const TextListItem = ({ article }: Props) => {
  return (
    <>
      <Anchor href={article.url} passHref>
        <Title>{article.title}</Title>
        <Intro>{article.intro}</Intro>
      </Anchor>
    </>
  );
};

export default TextListItem;
