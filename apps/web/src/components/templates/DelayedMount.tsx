import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

type DelayedMountProps = PropsWithChildren<{
  delay: number;
}>;

const DelayedMount: FunctionComponent<DelayedMountProps> = ({
  children,
  delay,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted && children;
};

export default DelayedMount;
