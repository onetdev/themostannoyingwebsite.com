import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { styled } from 'styled-components';

const Strike = styled.span`
  text-decoration: line-through;
`;

export default function SuperDuper() {
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
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
