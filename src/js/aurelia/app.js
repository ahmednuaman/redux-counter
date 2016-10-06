import 'babel-polyfill'

import Aurelia from 'aurelia-framework'

export default async (aurelia) => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

  await aurelia.start()
  aurelia.setRoot('app')
}
