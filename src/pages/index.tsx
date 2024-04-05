import { styled } from 'styled-components';
import { NextPage } from 'next';

import { ClearListStyle } from '@/styles/utils';
import TextListItem from '@/features/articles/components/TextListItem';
import SmallCoverListItem from '@/features/articles/components/SmallCoverListItem';
import LargeCoverItem from '@/features/articles/components/LargeCoverItem';
import ArticleService from '@/features/articles/services/ArticleService';
import { makeI18nStaticProps } from '@/utils/i18n';
import cssVars from '@/styles/css_vars';
import mediaQueries from '@/styles/media_queries';

const Grid = styled.main`
  display: grid;
  gap: ${cssVars.spacing.gap};
  grid-template-areas: 'cover' 'dense-list' 'list';
  ${mediaQueries.mdUp} {
    grid-template-areas: 'cover dense-list' 'list  list';
    grid-template-columns: 4fr 1fr;
  }
`;
const CoverArticle = styled.div`
  grid-area: cover;
`;
const DenseList = styled.ul`
  ${ClearListStyle}
  grid-area: dense-list;
  gap: ${cssVars.spacing.gap2x};
`;
const DenseListItem = styled.li`
  position: relative;
  padding-bottom: ${cssVars.spacing.gap2x};
  &::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid ${cssVars.color.secondary};
    left: ${cssVars.spacing.gap};
    right: ${cssVars.spacing.gap};
    bottom: ${cssVars.spacing.gap};
    opacity: 0.2;
  }
`;
const RegularList = styled.ul`
  ${ClearListStyle}
  grid-area: list;
  display: inline-flex;
  gap: ${cssVars.spacing.gap};
  flex-direction: column;
  ${mediaQueries.mdUp} {
    padding-top: ${cssVars.spacing.gap2x};
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const RegularListItem = styled.li`
  flex-basis: 100%;
  ${mediaQueries.mdUp} {
    flex-basis: calc((100% - (${cssVars.spacing.gap} * 3)) / 4);
  }
`;

const Index: NextPage = () => {
  const coverArticle = ArticleService.getAllFiltered({ isOnCover: true })[0];
  const articlePool = ArticleService.getAllFiltered({ isOnCover: false }).slice(
    0,
    12,
  );
  const denseList = articlePool.slice(0, 3);
  const regularList = articlePool.slice(3);

  return (
    <Grid>
      <CoverArticle>
        <LargeCoverItem article={coverArticle} />
      </CoverArticle>
      <DenseList>
        {denseList.map((article, index) => (
          <DenseListItem key={index}>
            <TextListItem article={article} />
          </DenseListItem>
        ))}
      </DenseList>
      <RegularList>
        {regularList.map((article, index) => (
          <RegularListItem key={index}>
            <SmallCoverListItem article={article} />
          </RegularListItem>
        ))}
      </RegularList>
    </Grid>
  );
};

export const getStaticProps = makeI18nStaticProps(['common']);
export default Index;
