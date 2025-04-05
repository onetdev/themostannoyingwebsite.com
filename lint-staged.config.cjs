/** @type {import('lint-staged').Config} */
module.exports = {
  '**/*.ts?(x)': () => 'pnpm run type-check',
  '**/*.(ts|js)?(x)': (filenames) => `pnpm run lint . ${filenames.join(' ')}`,
};
