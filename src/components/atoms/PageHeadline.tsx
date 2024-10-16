import { FunctionComponent, PropsWithChildren } from 'react';

type PageHeadlineProps = PropsWithChildren<{
  className?: string;
}>;

const PageHeadline: FunctionComponent<PageHeadlineProps> = ({
  children,
  className,
}) => <h1 className={`${className} mb-4`}>{children}</h1>;

export default PageHeadline;
