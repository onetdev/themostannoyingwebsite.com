import { PageHeadline } from '@maw/ui-lib';
import styles from '@maw/ui-lib/content.module.css';
import { clsx } from 'cn';
import type { ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';

export type DocumentPageProps = {
  /** Document title rendered as the page headline. */
  title: string;
  /**
   * Optional lead/meta line rendered right under the headline, e.g. a
   * "last updated" timestamp.
   */
  meta?: ReactNode;
  /**
   * Optional actions rendered on the headline row, e.g. a share button.
   */
  headerActions?: ReactNode;
  /** Disable the sticky "On this page" navigation. */
  showTableOfContents?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Shared layout for long-form documents (about, terms of use, privacy policy).
 *
 * Keeps the readable text column on the single `max-w-measure` token and adds
 * a sticky table of contents on wide viewports, where the pages previously
 * wasted the horizontal space around a narrow centered column.
 */
export function DocumentPage({
  title,
  meta,
  headerActions,
  showTableOfContents = true,
  className,
  children,
}: DocumentPageProps) {
  return (
    <div className={clsx('mx-auto w-full max-w-document', className)}>
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start xl:gap-12">
        <div className="min-w-0">
          <PageHeadline
            className="mx-auto w-full max-w-measure"
            actions={headerActions}
          >
            {title}
          </PageHeadline>
          {meta && (
            <p className="text-muted-foreground mx-auto mb-4 w-full max-w-measure text-sm">
              {meta}
            </p>
          )}
          <div className={styles.content} data-document-content="">
            {children}
          </div>
        </div>
        {showTableOfContents && (
          <TableOfContents className="sticky top-24 mt-2 hidden xl:block" />
        )}
      </div>
    </div>
  );
}
