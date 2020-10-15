const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/scripts/index.js',
    articles: './src/scripts/articles.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: './css/[name].[contenthash].css' }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/i,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/pages/articles.html',
      filename: 'articles.html',
      chunks: ['articles'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
