import { styled } from 'styled-components';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';

import { cssVars } from '@/styles/theme';

const FooterView = styled.footer`
  margin-top: calc(${cssVars.spacing.gap2x} * 3);
  padding: ${cssVars.spacing.gap2x} 0px;
  border-top: 1px solid ${cssVars.color.tertiary};
  font-size: ${cssVars.fontSize.small};
`;

const Footer = () => {
  const { t } = useTranslation(['common']);

  return (
    <FooterView>
      <Trans
        i18nKey="meta.recruiting"
        t={t}
        components={{
          linkTag: (
            <Link
              href="https://github.com/onetdev/themostannoyingwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      />
    </FooterView>
  );
};

export default Footer;
