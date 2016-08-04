const path = require('path');

// const proxy = require('./server/webpack-dev-proxy');
const plugins = require('./webpack/plugins');
const postcss = require('./webpack/postcss');
const loaders = require('./webpack/loaders');

const devmode = process.env.NODE_ENV !== 'production';

function getEntrySources(sources) {
  if (devmode) {
    sources.push('webpack-hot-middleware/client');
  }

  return sources;
}

module.exports = {
  entry: {
    app: getEntrySources(['babel-polyfill', './src/index.js']),
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd',
  },

  devtool: !devmode ? 'source-map' : 'inline-source-map',

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: '/' },
    // proxy: Object.assign({}, proxy(), { '/api/*': 'http://localhost:3000' }),
    inline: true,
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
      base: 'src',
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
