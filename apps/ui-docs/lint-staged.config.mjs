/** @type {import('lint-staged').Config} */
export default {
  "**/*.ts?(x)": () => "pnpm run check-types",
  "**/*.(ts|js)?(x)": (filenames) => `pnpm run lint . ${filenames.join(" ")}`,
};
