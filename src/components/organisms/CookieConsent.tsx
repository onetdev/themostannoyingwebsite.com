import Link from 'next/link';
import { FunctionComponent } from 'react';

import { useUserGrantsStore } from '@/state/user_grants';

const CookieBar: FunctionComponent = () => {
  const completed = useUserGrantsStore((state) => state.reviewCompleted);
  const setReviewCompleted = useUserGrantsStore(
    (state) => state.setReviewCompleted,
  );

  const close = () => setReviewCompleted(true);

  return (
    !completed && (
      <div className="sticky -bottom-3 rounded-md border border-tertiary bg-surface px-5 py-3 shadow-md">
        <p>
          This website uses cookies to ensure you get the best experience on our
          website. It&apos;s also a joke so many of the features are buggy or
          doens&apos;t even work on purpose. You can customize your experience
          and cookie settings in the settings menu.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Link href="/settings" passHref>
            Settings
          </Link>
          <button onClick={close}>Got it!</button>
        </div>
      </div>
    )
  );
};

export default CookieBar;
