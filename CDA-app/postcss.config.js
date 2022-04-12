/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
