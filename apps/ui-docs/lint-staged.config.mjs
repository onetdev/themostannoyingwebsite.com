export default {
  '**/*.ts?(x)': () => 'pnpm run check-types',
  '**/*.{js,ts,tsx,jsx,json,css,md}': (filenames) =>
    `biome check --write . ${filenames.join(' ')}`,
};
