/** @type {import('lint-staged').Config} */
module.exports = {
  '**/*.ts?(x)': () => 'npm run type-check',
  '**/*.(ts|js)?(x)': (filenames) => `npm run lint . ${filenames.join(' ')}`,
};
