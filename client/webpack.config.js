const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    common: './client/src/common/index.js',
    // platform: './client/src/platform/index.jsx',
    shop: './client/src/shop/index.jsx',
  },

  output: {
    path: path.join(__dirname, './app/public'),
    publicPath: '/',
    filename: chunkData => {
      return chunkData.chunk.name === 'common'
        ? 'common.[contenthash].js'
        : '[name].[chunkhash:8].bundle.js';
    },
    chunkFilename: '[id].[chunkhash:8].chunk.js',
  },

  module: {
    rules: [
      // Javascript & JSX
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ path.resolve(__dirname, './client/src') ],
        options: {
          fix: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: {
          extensions: [ '.js', '.jsx' ],
        },
      },

      // LESS & CSS
      {
        test: /\.css|\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 100,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },

      // Static Files - Images
      {
        test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    // Multiple Entrances
    // new HtmlWebpackPlugin({
    //   chunks: ['common', 'platform'],
    //   filename: 'platform.html',
    //   template: './client/public/platform.html'
    // }),
    new HtmlWebpackPlugin({
      chunks: [ 'common', 'shop' ],
      filename: 'shop.html',
      template: './client/public/shop.html',
    }),
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
    // Copy Public Files
    new CopyPlugin([
      './client/public/favicon.ico',
      './client/public/favicon.png',
      './client/public/manifest.json',
      './client/public/healthCheck.html',
      './client/public/non-healthCheck.html',
    ]),

    // LESS to CSS
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].chunk.css',
    }),

    // 自动清理
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimizer: [ new OptimizeCSSAssetsPlugin() ],
  },

  node: {
    net: 'empty',
  },

  resolve: {
    alias: {
      joi: 'joi-browser',
      '@': path.resolve(__dirname, './client/src'),
    },
  },

  stats: {
    entrypoints: false,
    children: false,
  },
};
