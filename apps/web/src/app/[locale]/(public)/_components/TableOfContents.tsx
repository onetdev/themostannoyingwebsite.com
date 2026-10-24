'use client';

import { clsx } from 'cn';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';

const HEADING_SELECTOR = 'h2, h3';

export type TableOfContentsItem = {
  id: string;
  label: string;
  level: number;
};

export type TableOfContentsProps = {
  className?: string;
  /**
   * CSS selector of the element that holds the document headings. The headings
   * are scanned after mount, so the table of contents stays in sync with
   * whatever the MDX content renders without a second parsing pass.
   */
  contentSelector?: string;
};

/**
 * Normalizes heading text into an anchor id. Unicode letters, marks and numbers
 * are preserved so non-latin scripts (e.g. Hindi, Japanese) still produce
 * usable anchors instead of empty strings.
 */
export function slugifyHeading(value: string): string {
  return value
    .normalize('NFC')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Sticky "On this page" navigation for long documents. Runs entirely on the
 * client: it adopts the server-rendered headings, assigns stable ids for
 * deep-linking, and highlights the section currently in view.
 */
export function TableOfContents({
  className,
  contentSelector = '[data-document-content]',
}: TableOfContentsProps) {
  const t = useTranslations();
  const headingId = useId();
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) {
      return;
    }

    const headings = Array.from(
      root.querySelectorAll<HTMLElement>(HEADING_SELECTOR),
    ).filter((element) => (element.textContent ?? '').trim().length > 0);

    const usedIds = new Map<string, number>();
    const nextItems = headings.map<TableOfContentsItem>((element) => {
      const label = (element.textContent ?? '').trim();

      if (!element.id) {
        const base = slugifyHeading(label) || 'section';
        const occurrence = usedIds.get(base) ?? 0;
        usedIds.set(base, occurrence + 1);
        element.id = occurrence === 0 ? base : `${base}-${occurrence}`;
      }

      return {
        id: element.id,
        label,
        level: element.tagName === 'H3' ? 3 : 2,
      };
    });

    setItems(nextItems);

    if (nextItems.length === 0) {
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }

        // First heading (in document order) that is currently on screen wins;
        // when none are visible we keep the previous section highlighted.
        const current = nextItems.find((item) => visible.has(item.id));
        if (current) {
          setActiveId(current.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    for (const item of nextItems) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [contentSelector]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-labelledby={headingId}
      className={clsx('text-sm', className)}
      data-track-section="navigation:toc"
    >
      <p
        id={headingId}
        className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase"
      >
        {t('common.document.onThisPage')}
      </p>
      <ul className="border-border flex flex-col border-s">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li
              key={item.id}
              className={clsx(
                isActive ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                data-track="navigation:toc"
                data-track-key={item.id}
                className={clsx(
                  'link-as-inherit hover-text-primary -ms-px block border-s-2 py-1 leading-snug',
                  item.level === 3 ? 'ps-6' : 'ps-3',
                  isActive
                    ? 'border-primary font-medium'
                    : 'border-transparent',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
