import { styled } from 'styled-components';
import { NextPage } from 'next';

import { makeI18nStaticProps } from '@/lib/i18n';

const Strike = styled.span`
  text-decoration: line-through;
`;

const SuperDuper: NextPage = () => {
  return (
    <main>
      <h1>Igors universal super loan</h1>
      <ul>
        <li>100% legit, no scam. Trust me.</li>
        <li>
          <Strike>We&apos;ll only break limbs after 4 missed payment.</Strike>
          Missing payments attracts bad luck, you don&apos;t want to get
          punished by the cosmos.
        </li>
        <li>Starting APR from 39,99%, what a bargain!</li>
        <li>
          No money? no nothing? Worry no more, we accept blood plasma and pure
          souls as collateral.
        </li>
      </ul>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps(['common']);
export default SuperDuper;
