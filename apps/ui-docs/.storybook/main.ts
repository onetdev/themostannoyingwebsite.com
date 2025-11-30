import type { StorybookConfig } from "@storybook/nextjs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-docs",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {},
  framework: {
    name: "@storybook/nextjs",
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
