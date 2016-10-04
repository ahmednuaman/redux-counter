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

const pugFiles = glob
  .sync(path.join(src, 'pug/*.pug'))
  .map((file) => path.basename(file, '.pug'))

const exampleFiles = _.without(pugFiles, 'index')
const entries = _.transform(exampleFiles, (obj, file) => {
  const dir = `./js/${file}/`
  const app = _.filter(fs.readdirSync(path.resolve(src, dir)), (file) => /^app.(j|t)s$/.test(file))
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
      loader: 'babel',
      query: {
        compact: false
      }
    }, {
      test: /\.tsx?$/,
      loader: 'awesome-typescript'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.pug$/,
      loader: 'pug'
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      reduxstore: `${src}/js/redux/`
    }
  },
  plugins: pugFiles.map((file) => new WebpackHtmlWebpackPlugin({
    template: `./pug/${file}.pug`,
    filename: `${file}.html`,
    inject: false,
    minify: COMPRESS ? {} : false
  })).concat([
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
