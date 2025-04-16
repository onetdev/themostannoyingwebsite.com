import { config } from "@maw/config-eslint/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ["storybook-static"],
  },
];
