import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  delay: number;
};

const DelayedMount = ({ children, delay }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted ? children : null;
};

export default DelayedMount;
