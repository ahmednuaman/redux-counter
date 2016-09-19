'use strict'

const BS_NAME = require('./package.json').name
const CWD = process.cwd()

const path = require('path')

require('browser-sync')
  .create(BS_NAME)
  .init({
    files: path.resolve(CWD, 'build/**/*'),
    server: path.resolve(CWD, 'build'),
    open: 'external'
  }, () => console.log('Browsersync is running...'))
