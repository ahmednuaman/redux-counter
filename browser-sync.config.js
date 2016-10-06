'use strict'

const CWD = process.cwd()

const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const bundler = webpack(webpackConfig)

require('browser-sync')
  .create()
  .init({
    files: path.resolve(CWD, 'build/**/*'),
    server: path.resolve(CWD, 'build'),
    open: 'external',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: false
      }),
      webpackHotMiddleware(bundler)
    ]
  }, () => console.log('Browsersync is running...'))
