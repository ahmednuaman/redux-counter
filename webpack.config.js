'use strict'

const BS_NAME = require('./package.json').name
const CWD = process.cwd()
const COMPRESS = !!process.env.COMPRESS

const browserSync = require('browser-sync')
const path = require('path')
const src = path.resolve(CWD, 'src')
const webpack = require('webpack')
const WebpackHtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

let config = {
  context: src,
  cache: true,
  entry: {
    angular: './js/angular/app.js',
    react: './js/react/app.js',
    vanilla: './js/vanilla/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(CWD, 'build/')
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.pug$/,
      loader: 'pug'
    }]
  },
  plugins: ['angular', 'index', 'react', 'vanilla'].map((file) => new WebpackHtmlWebpackPlugin({
    template: `./pug/${file}.pug`,
    filename: `${file}.html`,
    inject: false
  })).concat([
    new WebpackProgressBarPlugin(),
    new WebpackOnBuildPlugin((stats) => {
      try {
        browserSync.get(BS_NAME).reload()
      } catch (e) {}
    })
  ])
}

if (COMPRESS) {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

  config.devtool = null
}

module.exports = config
