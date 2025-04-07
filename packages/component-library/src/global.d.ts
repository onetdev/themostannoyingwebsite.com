import { JSX, PropsWithoutRef } from "react";

declare global {
  export type JSXProxyProps<T extends keyof JSX.IntrinsicElements> =
    PropsWithoutRef<JSX.IntrinsicElements[T]>;
}
