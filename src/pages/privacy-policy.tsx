import HTMLReactParser from 'html-react-parser';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import config from '@/config';
import styles from '@/styles/content.module.css';
import { makeI18nStaticProps } from '@/utils/i18n';
import { parse } from '@/utils/markdown';

// Privacy policy inspired by https://matomo.org/privacy-policy/
const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation('common');

  const content = useMemo(() => parse(contentMarkdownEn), []);

  return (
    <main>
      <SiteTitle>{t('navigation.privacyPolicy')}</SiteTitle>
      <PageHeadline className="mx-auto w-full max-w-narrow">
        {t('navigation.privacyPolicy')}
      </PageHeadline>
      <div className={styles['content']}>{HTMLReactParser(content)}</div>
    </main>
  );
};

const contentMarkdownEn = `
  This Policy describes the information we collect from you, how we use that information and our legal basis for doing so. It also covers whether and how that information may be shared and your rights and choices regarding the information you provide to us. This Privacy Policy applies to the information that we obtain through your use of mostannoyingwebsite.com (The MAW) website.

  ### Who we are

  The MAW is an open source project which is publicly available through [our git repository](${config.githubRepo}).
  If you have any questions about this privacy policy, please contact us at [${config.contactEmail}](${config.contactEmail}) email. We don't sell your personal data to anyone.

  ### What we collect

  In order for us to provide you the best possible experience on our websites, we need to collect and process certain information. Depending on your use of the Services, that may include:

  - **Usage data** — when you visit our site, we will store: the website from which you visited us from, the parts of our site you visit, the date and duration of your visit, your anonymised IP address, information from the device (device type, operating system, screen resolution, language, country you are located in, and web browser type) you used during your visit, and more. We process this usage data in Vercel Analytics for statistical purposes, to improve our site and to recognize and stop any misuse.
  - **Cookies** — we use cookies (small data files transferred onto computers or devices by sites) for record-keeping purposes and to enhance functionality on our site. You may deactivate or restrict the transmission of cookies by changing the settings of your web browser. Cookies that are already stored may be deleted at any time.
      
  ### Your Rights

  You have the right to be informed of Personal Data processed by The MAW, a right to rectification/correction, erasure and restriction of processing. You also have the right to ask from us a structured, common and machine-readable format of Personal Data you provided to us. We can only identify you via your email address and we can only adhere to your request and provide information if we have Personal Data about you through you having made contact with us directly and/or you using our site and/or service. To exercise any of the rights mentioned in this Privacy Policy and/or in the event of questions or comments relating to the use of Personal Data you may contact us: [${config.contactEmail}](${config.contactEmail}).
  In addition, you have the right to lodge a complaint with the data protection authority in your jurisdiction.

  ### Third party services we use

  When you visit our websites, we use the following third party services which may collect personal data:

  | Recipient                    | Purpose of processing           | Lawful basis        | Data location and security | Personal data collected by the third party | Privacy policy                                  |
  | ---------------------------- | ------------------------------- | ------------------- | -------------------------- | ------------------------------------------ | ----------------------------------------------- |
  | [Vercel](https://vercel.com) | To website related static files | Legitimate interest | Worldwide                  | None                                       | [link](https://vercel.com/legal/privacy-policy) |

  ### Retention of data

  We will retain your information as long as your account is active, as necessary to provide you with the services or as otherwise set forth in this Policy. We will also retain and use this information as necessary for the purposes set out in this Policy and to the extent necessary to comply with our legal obligations, resolve disputes, enforce our agreements and protect The MAW’s legal rights. We also collect and maintain aggregated, anonymized or pseudonymized information which we may retain indefinitely to protect the safety and security of our Site, improve our Services or comply with legal obligations.
  
  ### Privacy Policy Changes

  We may update this Policy from time to time. If we do, we’ll let you know about any material changes, either by notifying you on the website or by sending you an email.

  ### Contact Us

  If you have any questions about this Privacy Policy, please contact us at [${config.contactEmail}](${config.contactEmail}).
`;

export const getStaticProps = makeI18nStaticProps();
export default PrivacyPolicy;
