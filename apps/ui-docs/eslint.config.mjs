import config from "@maw/config-eslint/react-internal";
import storybook from "eslint-plugin-storybook";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    name: "ui-docs/ignore-storybook-static",
    ignores: ["storybook-static"],
  },
  ...storybook.configs["flat/recommended"],
];
