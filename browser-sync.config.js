'use strict'

const BS_NAME = require('./package.json').name
const path = require('path')

require('browser-sync')
  .create(BS_NAME)
  .init({
    server: path.resolve(process.cwd(), 'build'),
    open: 'external'
  }, () => console.log('Browsersync is running...'))
