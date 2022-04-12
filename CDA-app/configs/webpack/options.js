const { resolve } = require('path');
const resolvePath = (path) => resolve(__dirname, path);
module.exports = {
  paths: {
    index: 'public/index.html',
    appIndexJs: './src/index',
    app: resolvePath('../../'),
    components: resolvePath('../../src/components/'),
    hooks: resolvePath('../../src/hooks/'),
    views: resolvePath('../../src/views/'),
    services: resolvePath('../../src/services/'),
    contexts: resolvePath('../../src/contexts/'),
    routes: resolvePath('../../src/routes/'),
    assets: resolvePath('../../src/assets/'),
    locales: resolvePath('../../src/locales/'),
    api: resolvePath('../../src/api/'),
  },

  rules: [
    {
      test: [/\.jsx?$/, /\.tsx?$/],
      use: ['babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
    },
    {
      test: /\.module\.scss$/i,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              mode: 'local',
            },
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },

    {
      test: /\.(jpe?g|png|gif)$/i,
      use: 'file-loader',
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ],
};
