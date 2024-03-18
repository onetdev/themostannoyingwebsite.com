import config from '@/config';

// Privacy policy inspired by https://matomo.org/privacy-policy/
export default function PrivacyPolicy() {
  return (
    <main>
      <h1>Privacy policy</h1>
      <p>
        This Policy describes the information we collect from you, how we use
        that information and our legal basis for doing so. It also covers
        whether and how that information may be shared and your rights and
        choices regarding the information you provide to us. This Privacy Policy
        applies to the information that we obtain through your use of
        mostannoyingwebsite.com (The MAW) website.
      </p>
      <h3>Who we are</h3>
      <p>
        The MAW is an open source project which is publicly available through{' '}
        <a href="https://github.com/onetdev/themostannoyingwebsite.com">
          https://github.com/onetdev/themostannoyingwebsite.com
        </a>
        . If you have any questions about this privacy policy, please contact us
        at <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>{' '}
        email. We don&apos;t sell your personal data to anyone.
      </p>
      <h3>What we collect</h3>
      <p>
        In order for us to provide you the best possible experience on our
        websites, we need to collect and process certain information. Depending
        on your use of the Services, that may include:
      </p>
      <ul>
        <li>
          <strong>Usage data</strong> — when you visit our site, we will store:
          the website from which you visited us from, the parts of our site you
          visit, the date and duration of your visit, your anonymised IP
          address, information from the device (device type, operating system,
          screen resolution, language, country you are located in, and web
          browser type) you used during your visit, and more. We process this
          usage data in Matomo Analytics for statistical purposes, to improve
          our site and to recognize and stop any misuse.
        </li>
        <li>
          <strong>Cookies</strong> — we use cookies (small data files
          transferred onto computers or devices by sites) for record-keeping
          purposes and to enhance functionality on our site. You may deactivate
          or restrict the transmission of cookies by changing the settings of
          your web browser. Cookies that are already stored may be deleted at
          any time.
        </li>
      </ul>
      <h3>Your Rights</h3>
      <p>
        You have the right to be informed of Personal Data processed by The MAW,
        a right to rectification/correction, erasure and restriction of
        processing. You also have the right to ask from us a structured, common
        and machine-readable format of Personal Data you provided to us. We can
        only identify you via your email address and we can only adhere to your
        request and provide information if we have Personal Data about you
        through you having made contact with us directly and/or you using our
        site and/or service. To exercise any of the rights mentioned in this
        Privacy Policy and/or in the event of questions or comments relating to
        the use of Personal Data you may contact us:{' '}
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>. In
        addition, you have the right to lodge a complaint with the data
        protection authority in your jurisdiction.
      </p>
      <h3>Third party services we use</h3>
      <p>
        When you visit our websites, we use the following third party services
        which may collect personal data:
      </p>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Purpose of processing</th>
            <th>Lawful basis</th>
            <th>Data location and security</th>
            <th>Personal data collected by the third party</th>
            <th>Privacy policy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://vercel.com">Vercel</a>
            </td>
            <td>To website related static files</td>
            <td>Legitimate interest</td>
            <td>Worldwide</td>
            <td>None</td>
            <td>
              <a href="https://vercel.com/legal/privacy-policy">link</a>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Retention of data</h3>
      <p>
        We will retain your information as long as your account is active, as
        necessary to provide you with the services or as otherwise set forth in
        this Policy. We will also retain and use this information as necessary
        for the purposes set out in this Policy and to the extent necessary to
        comply with our legal obligations, resolve disputes, enforce our
        agreements and protect The MAW’s legal rights. We also collect and
        maintain aggregated, anonymized or pseudonymized information which we
        may retain indefinitely to protect the safety and security of our Site,
        improve our Services or comply with legal obligations.
      </p>
      <h3>Privacy Policy Changes</h3>
      <p>
        We may update this Policy from time to time. If we do, we’ll let you
        know about any material changes, either by notifying you on the website
        or by sending you an email.
      </p>
      <h3>Contact Us</h3>
      <p>
        E-Mail:{' '}
        <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
      </p>
    </main>
  );
}
