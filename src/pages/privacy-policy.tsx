import HTMLReactParser from 'html-react-parser';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import config from '@/config';
import { makeI18nStaticProps } from '@/lib/utils/i18n';
import { parse } from '@/lib/utils/markdown';
import styles from '@/styles/content.module.css';

// Privacy policy inspired by https://matomo.org/privacy-policy/
const PrivacyPolicy: NextPage = () => {
  const { t } = useTranslation('common');

  const content = useMemo(() => parse(contentMarkdownEn), []);

  return (
    <main>
      <SiteTitle>{t('navigation.privacyPolicy')}</SiteTitle>
      <PageHeadline className="mx-auto w-full max-w-screen-md">
        {t('navigation.privacyPolicy')}
      </PageHeadline>
      <div className={styles['content']}>{HTMLReactParser(content)}</div>
    </main>
  );
};

const contentMarkdownEn = `
  This Policy describes the information we collect from you, how we use that information, and our legal basis for doing so. It also covers whether and how that information may be shared and your rights and choices regarding the information you provide to us. This Privacy Policy applies to the information that we obtain through your use of mostannoyingwebsite.com (The MAW) website.

  ### Who we are

  The MAW is an open-source project that is publicly available through our [Git repository](${config.githubRepo}). If you have any questions about this privacy policy, please contact us at [${config.contactEmail}](${config.contactEmail}). We don't sell your personal data to anyone.

  ### What we collect

  To provide you with the best possible experience on our website, we need to collect and process certain information. Depending on your use of the Services, that may include:

  - **Usage data** — When you visit our site, we will store: the website from which you visited us, the parts of our site you visit, the date and duration of your visit, your anonymized IP address, and information from the device (device type, operating system, screen resolution, language, country, and web browser type) you used during your visit. We process this usage data in Vercel Analytics for statistical purposes, to improve our site, and to recognize and prevent misuse.
  - **Error reporting** — Our website uses Sentry to collect and monitor error reports to help improve site reliability. This data may include anonymized IP addresses, error messages, device information, and browser details. For more information, please refer to Sentry's Privacy Policy at https://sentry.io/privacy/.
  - **Cookies** — We use cookies (small data files transferred onto computers or devices by sites) for record-keeping purposes and to enhance functionality on our site. You may deactivate or restrict the transmission of cookies by adjusting your web browser settings. Cookies that are already stored may be deleted at any time.
  - **Embedded YouTube Videos** — Our website may include embedded videos from YouTube, operated by Google Inc. When you view a page with an embedded YouTube video, YouTube may collect and process information about your interaction with the video, including IP address, device information, and browsing details. For more information, please refer to Google's Privacy Policy at https://policies.google.com/privacy.

  ### Your Rights

  You have the right to be informed of Personal Data processed by The MAW and have the right to rectification/correction, erasure, and restriction of processing. You also have the right to ask us for a structured, common, and machine-readable format of Personal Data you provided to us. We can only identify you via your email address, and we can only adhere to your request and provide information if we have Personal Data about you through direct contact and/or your use of our site and/or services.

  To exercise any of the rights mentioned in this Privacy Policy and/or if you have questions or comments relating to the use of Personal Data, please contact us at [${config.contactEmail}](${config.contactEmail}). Additionally, you have the right to lodge a complaint with the data protection authority in your jurisdiction.

  ### Third party services we use

  When you visit our websites, we use the following third-party services which may collect personal data:

  | Recipient                       | Purpose of processing           | Lawful basis        | Data location and security | Personal data collected by the third party | Privacy policy                                  |
  | -------------------------------- | ------------------------------- | ------------------- | -------------------------- | ------------------------------------------ | ----------------------------------------------- |
  | [Vercel](https://vercel.com)    | To host website-related static files | Legitimate interest | Worldwide                  | None                                       | [link](https://vercel.com/legal/privacy-policy) |
  | [YouTube](https://youtube.com)  | Embedded videos                 | Legitimate interest | Worldwide                  | Device and browsing information            | [link](https://policies.google.com/privacy)     |
  | [Sentry](https://sentry.io)     | Error monitoring                | Legitimate interest | Worldwide                  | Error data, anonymized IP addresses, device, and browser information | [link](https://sentry.io/privacy/)             |

  ### Retention of data

  We will retain your information as long as necessary to provide you with services or as set forth in this Policy. We will also retain and use this information as necessary for the purposes set out in this Policy and to comply with legal obligations, resolve disputes, enforce agreements, and protect The MAW’s legal rights. We also collect and maintain aggregated, anonymized, or pseudonymized information that we may retain indefinitely to protect the safety and security of our site, improve our Services, or comply with legal obligations.

  ### Privacy Policy Changes

  We may update this Policy from time to time. If we do, we’ll let you know about any material changes, either by notifying you on the website or by sending you an email.

  ### Contact Us

  If you have any questions about this Privacy Policy, please contact us at [${config.contactEmail}](${config.contactEmail}).

  **Update 2024-10-29**: This update includes the necessary notice about embedded YouTube videos and its data-sharing implications, which should help ensure transparency and compliance with privacy laws.

  **Update 2024-12-11**: Update error monitoring related parts due to the introduction of Sentry.
`;

export const getStaticProps = makeI18nStaticProps();
export default PrivacyPolicy;
