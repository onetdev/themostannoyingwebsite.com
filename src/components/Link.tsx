import React, { FunctionComponent, PropsWithChildren } from 'react';
import Link, { type LinkProps as LinkPropsSuper } from 'next/link';
import { useRouter } from 'next/router';

type LinkProps = PropsWithChildren<
  LinkPropsSuper & { skipLocaleHandling?: boolean }
>;
const LinkComponent: FunctionComponent<LinkProps> = ({
  children,
  skipLocaleHandling: skipLocaleHandlingExternal,
  href: hrefExternal,
  ...rest
}) => {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || '';

  let skipLocaleHandling = skipLocaleHandlingExternal;
  let href = hrefExternal || router.asPath;
  if (href.toString().indexOf('http') === 0) {
    skipLocaleHandling = true;
  }

  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale as string);
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default LinkComponent;
