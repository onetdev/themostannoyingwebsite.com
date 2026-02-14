export type BorderedBoxProps = JSXProxyProps<'section'>;

export function BorderedBox({
  children,
  className = '',
  title,
  ...rest
}: BorderedBoxProps) {
  return (
    <section
      className={`bg-muted border-border rounded-md border p-5 ${className}`}
      {...rest}>
      {title && <h2 className="m-0 mb-5">{title}</h2>}
      <div className="flex w-full flex-col gap-1">{children}</div>
    </section>
  );
}
