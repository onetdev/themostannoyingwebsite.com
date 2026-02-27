import type {
  ClipboardEvent,
  FunctionComponent,
  PropsWithChildren,
} from 'react';

export type CopyMarkerProps = PropsWithChildren<{
  append?: { text: string; html: string } | 'url';
  enabled?: boolean;
  text: {
    readMoreAt: string;
  };
  onCopy?: (e: ClipboardEvent<HTMLDivElement>) => void;
}>;

export const CopyMarker: FunctionComponent<CopyMarkerProps> = ({
  append = 'url',
  children,
  enabled = false,
  text,
  onCopy,
}) => {
  const handleCopy = (e: ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString() || '';

    if (append === 'url') {
      const pageUrl = window.location.href;
      e.clipboardData.setData(
        'text/plain',
        `${selection}\n\n${text.readMoreAt} ${pageUrl}`,
      );
      e.clipboardData.setData(
        'text/html',
        `${selection}<br /><br />${text.readMoreAt} <a href="${pageUrl}">${pageUrl}</a>`,
      );
    } else {
      e.clipboardData.setData('text/plain', `${selection}${append?.text}`);
      e.clipboardData.setData('text/html', `${selection}${append?.html}`);
    }

    e.stopPropagation();
    e.preventDefault();
    onCopy?.(e);
  };

  return <div onCopy={enabled ? handleCopy : undefined}>{children}</div>;
};
