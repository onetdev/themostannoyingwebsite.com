import type { StorybookConfig } from "@storybook/nextjs";
import { dirname, join, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@storybook/addon-styling-webpack"),
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {},
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
  stories: [
    // "./src/**/*.stories.@(js,ts,jsx,tsx)",
    "../node_modules/@maw/ui-lib/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../node_modules/@maw/ui-lib/src/**/*.mdx",
  ],
  webpackFinal: async (config) => {
    if (!config.resolve) {
      return config;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "../src"),
    };
    return config;
  },
};
export default config;
