'use strict'

const CWD = process.cwd()
const PRODUCTION = process.env.NODE_ENV === 'production'

const _ = require('lodash')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const src = path.resolve(CWD, 'src')
const webpack = require('webpack')
const WebpackHtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

const pugFiles = glob
  .sync(path.join(src, 'pug/*.pug'))
  .map((file) => path.basename(file, '.pug'))

const exampleFiles = _.without(pugFiles, 'index')
const entries = _.transform(exampleFiles, (obj, file) => {
  const dir = `./js/${file}/`
  const app = _.filter(fs.readdirSync(path.resolve(src, dir)), (file) => /^app.(j|t)sx?$/.test(file))
  obj[file] = `./js/${file}/${app}`
}, {
  app: ['webpack/hot/dev-server', 'webpack-hot-middleware/client']
})

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
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        compact: false
      }
    }, {
      test: /\.ts$/,
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
    extensions: ['', '.ts', '.js', '.jsx'],
    alias: {
      reduxstore: `${src}/js/redux/`
    }
  },
  plugins: pugFiles.map((file) => new WebpackHtmlWebpackPlugin({
    template: `./pug/${file}.pug`,
    filename: `${file}.html`,
    inject: false,
    minify: PRODUCTION ? {} : false
  })).concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ])
}

if (PRODUCTION) {
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
