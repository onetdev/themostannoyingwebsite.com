export type CoverPlaceholderProps = {
  width: number;
  height: number;
};

export function CoverPlaceholder({ width, height }: CoverPlaceholderProps) {
  return (
    <div
      className="after:bg-radial-primary relative bg-[url(/assets/cover-placeholder.svg)] bg-repeat after:pointer-events-none after:absolute after:top-0 after:left-0 after:size-full after:mix-blend-saturation"
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    />
  );
}
