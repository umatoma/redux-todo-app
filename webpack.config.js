'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    name: 'app',
    entry: [
      './assets/index.js',
      './assets/index.sass',
    ],
    output: {
      path: __dirname + '/public/build',
      publicPath: '/build/',
      filename: 'app.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        },
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: 'file'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
      }),
      new ExtractTextPlugin('style.bundle.css')
    ]
  },
  {
    name: 'vendor',
    entry: [
      'html5shiv',
      'html5shiv/dist/html5shiv-printshiv.js',
      'es5-shim',
      'es5-shim/es5-sham'
    ],
    output: {
      path: __dirname + '/public/build',
      publicPath: '/build/',
      filename: 'vendor.bundle.js'
    }
  }
];