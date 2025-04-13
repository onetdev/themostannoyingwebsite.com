const config = require("./prettier-base.cjs");

/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss"
  ],
  ...config
};
