/* eslint-disable import/no-extraneous-dependencies */
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    name: 'app',
    entry: [
      './assets/index.jsx',
      './assets/index.sass'
    ],
    output: {
      path: path.join(__dirname, '/public/build'),
      publicPath: '/build/',
      filename: 'app.bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
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
      new ExtractTextPlugin('style.bundle.css', {
        allChunks: true
      })
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
      path: path.join(__dirname, '/public/build'),
      publicPath: '/build/',
      filename: 'vendor.bundle.js'
    }
  }
];
