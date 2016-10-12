const path = require('path');

const plugins = require('./webpack/plugins');
const postcss = require('./webpack/postcss');
const loaders = require('./webpack/loaders');
const endpoints = require('./webpack/endpoints');

const devmode = process.env.NODE_ENV !== 'production';

function getEntrySources(sources) {
  if (devmode) {
    sources.push('webpack-dev-server/client?http://0.0.0.0:8060');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  entry: getEntrySources(['babel-polyfill', './src/index.js']),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    chunkFilename: '[id].chunk.js',
  },

  plugins: plugins,

  devServer: {
    port: 8060,
    historyApiFallback: { index: '/' },
    proxy: {
      '*': {
        target: endpoints.apiEndpoint,
        secure: false,
        changeOrigin: true,
      },
    },
  },

  module: {
    preLoaders: [
      loaders.eslint,
    ],
    loaders: [
      loaders.manifest,
      loaders.css,
      loaders.js,
      loaders.image,
      loaders.font,
    ],
  },

  resolve: {
    root: path.resolve(__dirname),
    alias: {
      app: 'src',
    },
    extensions: ['', '.js'],
  },

  postcss: postcss,

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': 'window',
    'react/addons': true,
  },
};
