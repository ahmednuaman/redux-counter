'use strict'

const BS_NAME = require('./package.json').name
const CWD = process.cwd()
const COMPRESS = !!process.env.COMPRESS

const _ = require('lodash')
const browserSync = require('browser-sync')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const src = path.resolve(CWD, 'src')
const webpack = require('webpack')
const WebpackHtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

const pugFiles = glob
  .sync(path.join(src, 'pug/*.pug'))
  .map((file) => path.basename(file, '.pug'))

const exampleFiles = _.without(pugFiles, 'index')
const entries = _.transform(exampleFiles, (obj, file) => {
  const dir = `./js/${file}/`
  const app = _.head(fs.readdirSync(path.resolve(src, dir)))
  obj[file] = `./js/${file}/${app}`
}, {})

let config = {
  context: src,
  cache: true,
  entry: entries,
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
      test: /\.tsx?$/,
      loader: 'ts'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.pug$/,
      loader: 'pug'
    }]
  },
  resolve: {
    alias: {
      angular2pug: `${src}/pug/angular2/`,
      reduxstore: `${src}/js/redux/`
    }
  },
  plugins: pugFiles.map((file) => new WebpackHtmlWebpackPlugin({
    template: `./pug/${file}.pug`,
    filename: `${file}.html`,
    inject: false,
    minify: COMPRESS ? {} : false
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
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])

  config.devtool = null
}

module.exports = config
