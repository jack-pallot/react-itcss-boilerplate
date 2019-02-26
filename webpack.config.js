const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')

module.exports = {
  entry: {
    app: './src/js/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash].js',
  },

  devServer: {
    contentBase: './dist',
    open: false,
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash].css',
    }),
    new CleanWebpackPlugin(['dist/*']),
    new PrettierPlugin(),
    new ErrorOverlayPlugin(),
  ],

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          test: /\.js(\?.*)?$/i,
          exclude: /\/node_modules/,
          parallel: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
}
