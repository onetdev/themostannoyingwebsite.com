export type SelectOptionProps = JSXProxyProps<'span'> & {
  isSelected: boolean;
};

export function SelectOption({
  children,
  isSelected,
  ...rest
}: SelectOptionProps) {
  return (
    <div
      data-selected={isSelected.toString()}
      className="text-on-surface data-[selected=true]:text-on-primary z-10 flex grow cursor-pointer items-center justify-center text-center text-base"
      suppressHydrationWarning
      {...rest}>
      <span>{children}</span>
    </div>
  );
}
