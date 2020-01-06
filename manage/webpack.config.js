const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    manage: './client/src/main.js',
  },

  output: {
    path: path.join(__dirname, './app/public'),
    publicPath: '/',
    filename: 'bundle.[name].[contenthash].js',
    chunkFilename: '[id].[chunkhash:8].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('client')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          extractCSS: true,
        },
      },

      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },

      {
        test: /\.js$/,
        loader: 'babel-loader'
      },

      {
        test: /\.css|\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true
            }
          },
          {loader: 'postcss-loader'}
        ]
      },

      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader'
      },

      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          publicPath: '../../',
          name: 'lib/[name].[ext]',
        },
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      chunks: ['manage'],
      filename: 'manage.html',
      template: './client/public/manage.html'
    }),

    new CopyPlugin([
      './client/public/favicon.ico',
      './client/public/favicon.png',
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].chunk.css'
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },

  node: {
    net: 'empty',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      joi: 'joi-browser',
      vue$: 'vue/dist/vue.esm.js',
      '@manage': path.resolve(__dirname, './client/manage')
    }
  },

  stats: {
    entrypoints: false,
    children: false,
  },
};
