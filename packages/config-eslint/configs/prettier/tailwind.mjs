import config from './base.mjs';

/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  ...config,
};
