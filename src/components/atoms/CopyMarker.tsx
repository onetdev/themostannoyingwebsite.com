import { ClipboardEvent, FunctionComponent, PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';

export type CopyWithUrl = PropsWithChildren<{
  append?: { text: string; html: string } | 'url';
  enabled?: boolean;
}>;

const CopyMarker: FunctionComponent<CopyWithUrl> = ({
  append = 'url',
  children,
  enabled = false,
}) => {
  const t = useTranslations();

  const handleCopy = (e: ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString() || '';

    if (append === 'url') {
      const pageUrl = window.location.href;
      e.clipboardData.setData(
        'text/plain',
        `${selection}\n\n${t('app.readMoreAt')} ${pageUrl}`,
      );
      e.clipboardData.setData(
        'text/html',
        `${selection}<br /><br />${t('app.readMoreAt')} <a href="${pageUrl}">${pageUrl}</a>`,
      );
    } else {
      e.clipboardData.setData('text/plain', `${selection}${append?.text}`);
      e.clipboardData.setData('text/html', `${selection}${append?.html}`);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  return <div onCopy={enabled ? handleCopy : undefined}>{children}</div>;
};

export default CopyMarker;
