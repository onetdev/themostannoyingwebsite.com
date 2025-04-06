declare global {
  type JSXProxyProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
    JSX.IntrinsicElements[T]
  >;
}
