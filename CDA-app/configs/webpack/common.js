/* eslint-disable import/extensions */
// shared config (dev and prod)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { paths, rules } = require('./options');

module.exports = {
  context: paths.app,
  entry: paths.appIndexJs,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      components: paths.components,
      hooks: paths.hooks,
      views: paths.views,
      services: paths.services,
      contexts: paths.contexts,
      routes: paths.routes,
      assets: paths.assets,
      locales: paths.locales,
      api: paths.api,
    },
  },
  module: {
    rules,
  },
  plugins: [new HtmlWebpackPlugin({ template: paths.index })],

  performance: {
    hints: false,
  },
};
